using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo.Database;
using DemoGym.Entities;
using DemoGym.Dtos;
using SMG.Entities;
using System.Data;

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalariesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalariesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Salaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salary>>> GetSalaries()
        {
            return await _context.Salaries.ToListAsync();
        }

        // GET: api/Salaries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Salary>> GetSalary(Guid id)
        {
            var salary = await _context.Salaries.FindAsync(id);

            if (salary == null)
            {
                return NotFound();
            }

            return salary;
        }

        // PUT: api/Salaries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalary(Guid id, Salary salary)
        {
            if (id != salary.Id)
            {
                return BadRequest();
            }

            _context.Entry(salary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalaryExists(id))
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

        // POST: api/Salaries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Salary>> PostSalary(SalaryDTO salaryDTO)
        {
            int memberCount = await _context.PTMembers.CountAsync(pm => pm.EmployeeId == salaryDTO.EmployeeId);

            var salaryAmount = 0m;

            switch (salaryDTO.role)
            {
                case "Owner":
                    salaryAmount = salaryDTO.WorkingDay * 1000000;
                    break;
                case "Manager":
                    salaryAmount = salaryDTO.WorkingDay * 600000;
                    break;
                case "PersonalTraining":
                    salaryAmount = salaryDTO.WorkingDay * 300000 + memberCount*3000000;
                    if (memberCount == 0)
                    {
                        salaryAmount *= 0.8m; 
                    }
                    break;
                case "Receptionist":
                    salaryAmount = salaryDTO.WorkingDay * 300000;
                    break;
                default:
                    return BadRequest("Invalid role");
            }

            var salary = new Salary
            {
                Id = Guid.NewGuid(),
                role = salaryDTO.role,
                WorkingDay = salaryDTO.WorkingDay,
                EmployeeId = salaryDTO.EmployeeId,
                SalaryE = salaryAmount
            };

            _context.Salaries.Add(salary);
            await _context.SaveChangesAsync();

            return Ok(salary);
        }

        // DELETE: api/Salaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalary(Guid id)
        {
            var salary = await _context.Salaries.FindAsync(id);
            if (salary == null)
            {
                return NotFound();
            }

            _context.Salaries.Remove(salary);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalaryExists(Guid id)
        {
            return _context.Salaries.Any(e => e.Id == id);
        }
    }
}
