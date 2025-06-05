using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo.Database;
using DemoGym.Entities;
using DemoGym.Entities.Common;
using DemoGym.Dtos;      // EmployeeDTO, CreateEmployeeDTO
using System.Security.Claims;

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
            => await _context.employees.ToListAsync();

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var emp = await _context.employees.FindAsync(id);
            if (emp == null) return NotFound();
            return emp;
        }

        // GET: api/Employees/branchId/3
        [HttpGet("branchId/{branchId}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeesByBranchId(int branchId)
        {
            var list = await _context.employees.Where(e => e.BranchId == branchId).ToListAsync();
            if (!list.Any())
                return NotFound(new { message = "No employees found for the specified branch." });
            return Ok(list);
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployees([FromBody] CreateEmployeeDTO dto)
        {
            // Tạm tính memberCount = 0 (chưa có Id)
            int memberCount = 0;
            decimal salaryAmount = dto.Workingday switch
            {
                null => 0m,
                _ when dto.Role == "Club Manager" => (decimal)(dto.Workingday * 1000000),
                _ when dto.Role == "Sales Manager" => (decimal)(dto.Workingday * 600000),
                _ when dto.Role == "PT" => (decimal)(dto.Workingday * 300000) + memberCount * 3000000,
                _ when dto.Role == "Receptionist" => (decimal)(dto.Workingday * 300000),
                _ => 0m
            };
            if (salaryAmount == 0m && dto.Role is not null
                && dto.Role is not ("Club Manager" or "Sales Manager" or "PT" or "Receptionist"))
            {
                return BadRequest("Invalid role");
            }
            var userName = User.Claims.FirstOrDefault(c => c.Type == "name")?.Value
                           ?? "Unknown";
            var now = DateTime.Now;

            var employee = new Employee
            {
                Name = dto.Name,
                NickName = dto.NickName,
                Describe = dto.Describe,
                Strength = dto.Strength,
                Role = dto.Role,
                Birthday = dto.Birthday,      // Page: DateTime? → dùng trực tiếp
                Gender = dto.Gender,
                Address = dto.Address,
                PhoneNumber = dto.PhoneNumber,
                PictureUrl = dto.PictureUrl,
                BranchId = dto.BranchId,
                Workingday = dto.Workingday,
                Salary = salaryAmount,

                // BaseEntity
                IsActive = true,
                CreateBy = userName,
                CreateDate = now,
                UpdateBy = null,
                UpdateDate = null
            };

            _context.employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee),
                                   new { id = employee.Id },
                                   employee);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeDTO updatedDto)
        {
            if (id != updatedDto.Id)
                return BadRequest();

            var existing = await _context.employees.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = updatedDto.Name;
            existing.NickName = updatedDto.NickName;
            existing.Describe = updatedDto.Describe;
            existing.Strength = updatedDto.Strength;
            existing.Role = updatedDto.Role;
            existing.Birthday = updatedDto.Birthday; // dùng DateTime? trực tiếp
            existing.Gender = updatedDto.Gender;
            existing.Address = updatedDto.Address;
            existing.PhoneNumber = updatedDto.PhoneNumber;
            existing.PictureUrl = updatedDto.PictureUrl;
            existing.BranchId = updatedDto.BranchId;
            existing.Workingday = updatedDto.Workingday;
            existing.Salary = updatedDto.Salary;
            existing.IsActive = updatedDto.IsActive;

            var userName = User.Claims.FirstOrDefault(c => c.Type == "name")?.Value
                                       ?? "Unknown";
            existing.UpdateBy = userName;
            existing.UpdateDate = DateTime.Now;

            _context.Entry(existing).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var emp = await _context.employees.FindAsync(id);
            if (emp == null) return NotFound();

            _context.employees.Remove(emp);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool EmployeeExists(int id)
            => _context.employees.Any(e => e.Id == id);
    }
}
