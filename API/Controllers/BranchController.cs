using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo.Database;
using DemoGym.Entities;       // Namespace chứa Branch và BaseEntity
using DemoGym.Dtos;           // Namespace chứa BranchDTO

namespace Demo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // CHỈ CÁC ACTION không có [AllowAnonymous] mới cần token
    [Authorize]
    public class BranchController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BranchController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Branch
        // Cho phép mọi người (kể cả chưa login) xem danh sách
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Branch>>> GetBranches()
        {
            return await _context.branches
                                 .AsNoTracking()
                                 .ToListAsync();
        }

        // GET: api/Branch/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranch(int id)
        {
            var branch = await _context.branches
                                       .AsNoTracking()
                                       .FirstOrDefaultAsync(b => b.Id == id);
            if (branch == null)
                return NotFound();
            return branch;
        }

        // POST: api/Branch  <-- Cần token
        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranch([FromBody] BranchDTO branchDTO)
        {
            // Lúc này HttpContext.User đã chứa claim “name” nếu token hợp lệ
            var userName = User.Claims.FirstOrDefault(c => c.Type == "name")?.Value
                           ?? "Unknown";

            var now = DateTime.Now;

            var branch = new Branch
            {
                Name = branchDTO.Name,
                Description = branchDTO.Description,
                Hotline = branchDTO.Hotline,
                Zalolink = branchDTO.Zalolink,
                Address = branchDTO.Address,
                ImageUrl = branchDTO.ImageUrl,

                // BaseEntity
                IsActive = true,
                CreateBy = userName,
                CreateDate = now,
                UpdateBy = null,
                UpdateDate = null
            };

            _context.branches.Add(branch);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetBranch),
                new { id = branch.Id },
                branch
            );
        }

        // PUT: api/Branch/5  <-- Cần token
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBranch(int id, [FromBody] BranchDTO branchDTO)
        {
            var branch = await _context.branches.FindAsync(id);
            if (branch == null)
                return NotFound();

            var userName = User.Claims.FirstOrDefault(c => c.Type == "name")?.Value
                           ?? "Unknown";

            var now = DateTime.Now;

            // Cập nhật các trường chính
            branch.Name = branchDTO.Name;
            branch.Description = branchDTO.Description;
            branch.Hotline = branchDTO.Hotline;
            branch.Zalolink = branchDTO.Zalolink;
            branch.Address = branchDTO.Address;
            branch.ImageUrl = branchDTO.ImageUrl;
            branch.IsActive = branchDTO.IsActive;
            // Cập nhật BaseEntity
            branch.UpdateBy = userName;
            branch.UpdateDate = now;

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

            return NoContent();
        }

        // DELETE: api/Branch/5  <-- Cần token
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var branch = await _context.branches.FindAsync(id);
            if (branch == null)
                return NotFound();

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
