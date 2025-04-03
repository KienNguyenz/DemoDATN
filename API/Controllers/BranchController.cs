using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo.Database;
using SMG.Entities;       // Hoặc namespace khác nơi chứa Branch
using DemoGym.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Demo.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BranchController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Branch
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Branch>>> GetBranches()
        {
            return await _context.branches.ToListAsync();
        }

        // GET: api/Branch/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranch(int id)
        {
            var branch = await _context.branches.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }
            return branch;
        }

        // POST: api/Branch
        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranch([FromBody] BranchDTO branchDTO)
        {
            // Tạo entity từ DTO
            var branch = new Branch
            {
                routerLink = branchDTO.routerLink,
                Name = branchDTO.Name,
                Hotline = branchDTO.Hotline,
                Zalolink = branchDTO.Zalolink,
                Address = branchDTO.Address,
                ImageUrl = branchDTO.ImageUrl
            };

            _context.branches.Add(branch);
            await _context.SaveChangesAsync();

            // Trả về 201 + đường dẫn GET 
            // kèm object vừa tạo
            return CreatedAtAction(nameof(GetBranch), new { id = branch.Id }, branch);
        }

        // PUT: api/Branch/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBranch(int id, [FromBody] BranchDTO branchDTO)
        {
            var branch = await _context.branches.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }

            // Cập nhật từ DTO
            branch.routerLink = branchDTO.routerLink;
            branch.Name = branchDTO.Name;
            branch.Hotline = branchDTO.Hotline;
            branch.Zalolink = branchDTO.Zalolink;
            branch.Address = branchDTO.Address;
            branch.ImageUrl = branchDTO.ImageUrl;

            _context.Entry(branch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
                    return NotFound();
                else
                    throw;
            }

            // 204 no content
            return NoContent();
        }

        // DELETE: api/Branch/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var branch = await _context.branches.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }

            _context.branches.Remove(branch);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BranchExists(int id)
        {
            return _context.branches.Any(e => e.Id == id);
        }
    }
}
