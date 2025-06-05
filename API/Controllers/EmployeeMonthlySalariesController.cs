using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Demo.Database;
using DemoGym.Entities;
using DemoGym.Dtos;

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlySalariesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MonthlySalariesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MonthlySalaries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeMonthlySalaryDto>>> GetAll()
        {
            var data = await _context.EmployeeMonthlySalaries
                .Include(ms => ms.Employee)  // nếu muốn hiển thị thêm thông tin Employee
                .Select(ms => new EmployeeMonthlySalaryDto
                {
                    Id = ms.Id,
                    EmployeeId = ms.EmployeeId,
                    Month = ms.Month,
                    Year = ms.Year,
                    WorkingDays = ms.WorkingDays,
                    SalaryAmount = ms.SalaryAmount,
                    IsActive = ms.IsActive,
                    CreateBy = ms.CreateBy,
                    CreateDate = ms.CreateDate,
                    UpdateBy = ms.UpdateBy,
                    UpdateDate = ms.UpdateDate
                })
                .ToListAsync();

            return Ok(data);
        }

        // GET: api/MonthlySalaries/employee/5?month=6&year=2025
        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<EmployeeMonthlySalaryDto>> GetByEmployeeAndMonth(
            int employeeId, [FromQuery] int month, [FromQuery] int year)
        {
            var ms = await _context.EmployeeMonthlySalaries
                .Where(x => x.EmployeeId == employeeId && x.Month == month && x.Year == year)
                .FirstOrDefaultAsync();

            if (ms == null)
                return NotFound(new { message = "Không tìm thấy lương tháng/năm này cho nhân viên." });

            var dto = new EmployeeMonthlySalaryDto
            {
                Id = ms.Id,
                EmployeeId = ms.EmployeeId,
                Month = ms.Month,
                Year = ms.Year,
                WorkingDays = ms.WorkingDays,
                SalaryAmount = ms.SalaryAmount,
                IsActive = ms.IsActive,
                CreateBy = ms.CreateBy,
                CreateDate = ms.CreateDate,
                UpdateBy = ms.UpdateBy,
                UpdateDate = ms.UpdateDate
            };

            return Ok(dto);
        }

        // POST: api/MonthlySalaries
        [HttpPost]
        public async Task<ActionResult<EmployeeMonthlySalaryDto>> Create([FromBody] CreateMonthlySalaryDTO dto)
        {
            // 1. Kiểm tra xem đã tồn tại record cho employeeId/month/year chưa
            bool existed = await _context.EmployeeMonthlySalaries.AnyAsync(x =>
                x.EmployeeId == dto.EmployeeId && x.Month == dto.Month && x.Year == dto.Year);
            if (existed)
                return BadRequest(new { message = "Đã có bản ghi lương cho tháng/năm này." });

            // 2. Lấy thông tin Employee (có Role, Workingday)
            var employee = await _context.employees
                .Include(e => e.PTMembers)    // để đếm số PTMember nếu role = "PT"
                .FirstOrDefaultAsync(e => e.Id == dto.EmployeeId);

            if (employee == null)
                return BadRequest(new { message = "Không tìm thấy nhân viên." });

            // 3. Tính salaryAmount theo công thức hiện có
            decimal salaryAmount = 0m;
            int memberCount = employee.PTMembers.Count; // nếu ràng buộc PTMembers là BE đã load

            // Lấy số ngày làm (dto.WorkingDays). Nếu Workday trong Employee có khác, ưu tiên dto
            int workingDays = dto.WorkingDays;

            switch (employee.Role)
            {
                case "Club Manager":
                    salaryAmount = workingDays * 1000000m;
                    break;
                case "Sales Manager":
                    salaryAmount = workingDays * 600000m;
                    break;
                case "PT":
                    // Công thức cũ: workingDays * 300k + memberCount*3tr
                    salaryAmount = workingDays * 300000m + memberCount * 3000000m;
                    // Nếu không có khách, giảm 20%
                    if (memberCount == 0)
                        salaryAmount *= 0.8m;
                    break;
                case "Receptionist":
                    salaryAmount = workingDays * 300000m;
                    break;
                default:
                    return BadRequest(new { message = "Role không hợp lệ." });
            }

            // 4. Gán giá trị cho entity
            var userName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value
                          ?? "Unknown";
            var now = DateTime.Now;

            var msEntity = new EmployeeMonthlySalary
            {
                EmployeeId = dto.EmployeeId,
                Month = dto.Month,
                Year = dto.Year,
                WorkingDays = workingDays,
                SalaryAmount = salaryAmount,
                IsActive = true,
                CreateBy = userName,
                CreateDate = now,
                UpdateBy = null,
                UpdateDate = null
            };

            _context.EmployeeMonthlySalaries.Add(msEntity);
            await _context.SaveChangesAsync();

            // 5. Trả về DTO
            var resultDto = new EmployeeMonthlySalaryDto
            {
                Id = msEntity.Id,
                EmployeeId = msEntity.EmployeeId,
                Month = msEntity.Month,
                Year = msEntity.Year,
                WorkingDays = msEntity.WorkingDays,
                SalaryAmount = msEntity.SalaryAmount,
                IsActive = msEntity.IsActive,
                CreateBy = msEntity.CreateBy,
                CreateDate = msEntity.CreateDate,
                UpdateBy = msEntity.UpdateBy,
                UpdateDate = msEntity.UpdateDate
            };

            return CreatedAtAction(nameof(GetByEmployeeAndMonth),
                                   new { employeeId = resultDto.EmployeeId, month = resultDto.Month, year = resultDto.Year },
                                   resultDto);
        }

        // PUT: api/MonthlySalaries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateMonthlySalaryDTO dto)
        {
            var existing = await _context.EmployeeMonthlySalaries
                .Include(ms => ms.Employee)
                .ThenInclude(e => e.PTMembers)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existing == null)
                return NotFound(new { message = "Không tìm thấy bản ghi lương." });

            // Nếu client muốn đổi month/year thì cần cân nhắc, nhưng ở đây chỉ cập nhật WorkingDays
            existing.WorkingDays = dto.WorkingDays;

            // Tính lại SalaryAmount dựa vào role + số member + workingDays mới
            decimal salaryAmount = 0m;
            int memberCount = existing.Employee?.PTMembers.Count ?? 0;
            int workingDays = dto.WorkingDays;
            string? role = existing.Employee?.Role;

            switch (role)
            {
                case "Club Manager":
                    salaryAmount = workingDays * 1000000m;
                    break;
                case "Sales Manager":
                    salaryAmount = workingDays * 600000m;
                    break;
                case "PT":
                    salaryAmount = workingDays * 300000m + memberCount * 3000000m;
                    if (memberCount == 0)
                        salaryAmount *= 0.8m;
                    break;
                case "Receptionist":
                    salaryAmount = workingDays * 300000m;
                    break;
                default:
                    return BadRequest(new { message = "Role không hợp lệ." });
            }

            existing.SalaryAmount = salaryAmount;
            existing.UpdateBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value
                                ?? "Unknown";
            existing.UpdateDate = DateTime.Now;

            _context.Entry(existing).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.EmployeeMonthlySalaries.Any(x => x.Id == id))
                    return NotFound(new { message = "Không tìm thấy bản ghi lương (sau khi lưu trùng)." });
                throw;
            }

            return NoContent();
        }

        // DELETE: api/MonthlySalaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ms = await _context.EmployeeMonthlySalaries.FindAsync(id);
            if (ms == null)
                return NotFound(new { message = "Không tìm thấy bản ghi lương." });

            _context.EmployeeMonthlySalaries.Remove(ms);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
