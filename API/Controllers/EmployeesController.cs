﻿using System;
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
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> Getemployees()
        {
            return await _context.employees.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // Route này sẽ tạo URL có dạng /api/Employees/branchId=1
        [HttpGet("branchId/{branchId}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeesByBranchId(int branchId)
        {
            var employees = await _context.employees.Where(e => e.BranchId == branchId).ToListAsync();
            if (!employees.Any())
            {
                return NotFound(new { message = "No employees found for the specified branch." });
            }
            return Ok(employees);
        }


        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmpoyees(EmployeeDTO employeeDTO)
        {
            var employees = new Employee
            {
                Id = new int(),
                Name = employeeDTO.Name,
                NickName = employeeDTO.NickName,
                Describe = employeeDTO.Describe,
                Strength = employeeDTO.Strength,
                Role = employeeDTO.Role,
                Birthday = employeeDTO.Birthday,
                Gender = employeeDTO.Gender,
                Address = employeeDTO.Address,
                PhoneNumber = employeeDTO.PhoneNumber,
                BranchId = employeeDTO.BranchId,
                 
    };

            _context.employees.Add(employees);
            await _context.SaveChangesAsync();

            return Ok(employees);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.employees.Any(e => e.Id == id);
        }
    }
}
