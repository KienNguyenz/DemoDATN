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

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PackagesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Packages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Package>>> Getpackages()
        {
            return await _context.packages.ToListAsync();
        }

        // GET: api/Packages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Package>> GetPackage(int id)
        {
            var package = await _context.packages.FindAsync(id);

            if (package == null)
            {
                return NotFound();
            }

            return package;
        }

        // PUT: api/Packages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackage(int id, Package package)
        {
            if (id != package.Id)
            {
                return BadRequest();
            }

            _context.Entry(package).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageExists(id))
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

        // POST: api/Packages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Member>> PostPackage(PackagesDTO packagesDTO)
        {
            var packages = new Package
            {
                Id = new int(),
                PackageName = packagesDTO.PackageName,
                Price = packagesDTO.Price,
                Duration = packagesDTO.Duration,
                BranchId = packagesDTO.BranchId

            };

            _context.packages.Add(packages);
            await _context.SaveChangesAsync();

            return Ok(packages);
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackage(int id)
        {
            var package = await _context.packages.FindAsync(id);
            if (package == null)
            {
                return NotFound();
            }

            _context.packages.Remove(package);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PackageExists(int id)
        {
            return _context.packages.Any(e => e.Id == id);
        }
    }
}
