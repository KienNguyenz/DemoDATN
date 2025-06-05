using Demo.Database;
using DemoGym.Entities;
using DemoGym.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MembersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Tính ngày hết hạn = startDate + số ngày (theo duration)
        /// </summary>
        private DateTime CalculateExpirationDate(DateTime startDate, string duration)
        {
            if (string.IsNullOrWhiteSpace(duration))
                return startDate;

            var parts = duration.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length < 2)
                return startDate;

            if (!int.TryParse(parts[0], out var number))
                return startDate;

            var unit = parts[1].ToLowerInvariant();
            if (unit.Contains("ngày") || unit.Contains("ngay"))
            {
                return startDate.AddDays(number);
            }

            return startDate;
        }

        // GET: api/Members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> Getmembers()
        {
            var members = await _context.members
                                        .Include(m => m.Package)
                                        .ToListAsync();

            foreach (var m in members)
            {
                if (m.PackageId.HasValue && m.Package != null && m.CreateDate.HasValue)
                {
                    // Nếu có UpdateDate thì ưu tiên lấy UpdateDate, ngược lại lấy CreateDate
                    var start = m.UpdateDate ?? m.CreateDate.Value;
                    var expiration = CalculateExpirationDate(start, m.Package.Duration);
                    m.IsActive = (expiration >= DateTime.Now);
                }
                else
                {
                    m.IsActive = false;
                }
            }

            return members;
        }

        // POST: api/Members
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(MemberDTO memberDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var now = DateTime.Now;
            var member = new Member
            {
                FirstName = memberDTO.FirstName,
                LastName = memberDTO.LastName,
                Email = memberDTO.Email,
                Birthday = memberDTO.Birthday,
                Gender = memberDTO.Gender,
                Address = memberDTO.Address,
                PhoneNumber = memberDTO.PhoneNumber,
                PackageId = memberDTO.PackageId,
                Picture = memberDTO.Picture,
                BranchId = memberDTO.BranchId,
                CreateDate = now,
                UpdateDate = null,
                IsActive = false // sẽ tính ngay sau
            };

            // Tính IsActive dựa trên CreateDate + số ngày
            if (member.PackageId.HasValue)
            {
                var pkg = await _context.packages.FindAsync(member.PackageId.Value);
                if (pkg != null)
                {
                    var expiration = CalculateExpirationDate(member.CreateDate.Value, pkg.Duration);
                    member.IsActive = (expiration >= now);
                }
            }

            _context.members.Add(member);
            await _context.SaveChangesAsync();

            return Ok(member);
        }

        // PUT: api/Members/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(int id, Member memberPayload)
        {
            if (id != memberPayload.Id)
                return BadRequest("ID không khớp.");

            var existing = await _context.members
                                         .Include(m => m.Package)
                                         .FirstOrDefaultAsync(m => m.Id == id);
            if (existing == null)
                return NotFound();

            // Cập nhật thông tin cơ bản
            existing.FirstName = memberPayload.FirstName;
            existing.LastName = memberPayload.LastName;
            existing.Email = memberPayload.Email;
            existing.Birthday = memberPayload.Birthday;
            existing.Gender = memberPayload.Gender;
            existing.Address = memberPayload.Address;
            existing.PhoneNumber = memberPayload.PhoneNumber;
            existing.BranchId = memberPayload.BranchId;
            existing.Picture = memberPayload.Picture;

            // Nếu thay đổi gói
            if (memberPayload.PackageId != existing.PackageId)
            {
                existing.PackageId = memberPayload.PackageId;
            }

            // Cập nhật UpdateDate
            var now = DateTime.Now;
            existing.UpdateDate = now;

            // Tính lại IsActive = (UpdateDate + duration) >= now
            if (existing.PackageId.HasValue)
            {
                if (existing.Package == null || existing.Package.Id != existing.PackageId.Value)
                {
                    existing.Package = await _context.packages.FindAsync(existing.PackageId.Value);
                }

                if (existing.Package != null && existing.UpdateDate.HasValue)
                {
                    var expiration = CalculateExpirationDate(existing.UpdateDate.Value, existing.Package.Duration);
                    existing.IsActive = (expiration >= now);
                }
                else
                {
                    existing.IsActive = false;
                }
            }
            else
            {
                existing.IsActive = false;
            }

            _context.Entry(existing).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.members.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }
    }
}
