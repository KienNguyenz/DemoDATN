using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo.Database;
using SMG.Entities;
using DemoGym.Dtos;

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
        public async Task<ActionResult<IEnumerable<Branch>>> Getbranches()
        {
            return await _context.branches.ToListAsync();
        }

        // GET: api/Branch/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranch(Guid id)
        {
            var branch = await _context.branches.FindAsync(id);

            if (branch == null)
            {
                return NotFound();
            }

            return branch;
        }

        // PUT: api/Branch/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBranch(Guid id, Branch branch)
        {
            if (id != branch.Id)
            {
                return BadRequest();
            }

            _context.Entry(branch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Branch
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranch(BranchDTO branchDTO)
        {
            var branch = new Branch
            {
                Id = Guid.NewGuid(),
                Name = branchDTO.Name,
                Address = branchDTO.Address
            };

            _context.branches.Add(branch);
            await _context.SaveChangesAsync();

            return Ok(branch);
        }

        // DELETE: api/Branch/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(Guid id)
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

        private bool BranchExists(Guid id)
        {
            return _context.branches.Any(e => e.Id == id);
        }
    }
}
