using Demo.Database;
using DemoGym.Dtos;
using DemoGym.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoGym.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RevenueLogsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RevenueLogsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/RevenueLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RevenueLogDTO>>> GetAll()
        {
            var logs = await _context.RevenueLogs
                .AsNoTracking()
                .OrderByDescending(r => r.Date)
                .ToListAsync();

            // Map entity -> DTO (thủ công)
            var result = logs.Select(r => new RevenueLogDTO
            {
                Id = r.Id,
                EmployeeId = r.EmployeeId,
                PackageId = r.PackageId,
                Price = r.Price,
                Date = r.Date,
                IsActive = r.IsActive,
                CreateBy = r.CreateBy,
                UpdateBy = r.UpdateBy,
                CreateDate = r.CreateDate,
                UpdateDate = r.UpdateDate
            }).ToList();

            return Ok(result);
        }

        // POST: api/RevenueLogs
        [HttpPost]
        public async Task<ActionResult<RevenueLogDTO>> Create([FromBody] CreateRevenueLogDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Tạo entity mới
            var entity = new RevenueLog
            {
                EmployeeId = dto.EmployeeId,
                PackageId = dto.PackageId,
                Price = dto.Price,
                Date = dto.Date,
                IsActive = true,
                CreateDate = DateTime.UtcNow,
                // CreateBy: nếu có thông tin User.Identity.Name thì set ở đây
            };

            _context.RevenueLogs.Add(entity);
            await _context.SaveChangesAsync();

            var resultDto = new RevenueLogDTO
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                PackageId = entity.PackageId,
                Price = entity.Price,
                Date = entity.Date,
                IsActive = entity.IsActive,
                CreateBy = entity.CreateBy,
                CreateDate = entity.CreateDate
            };

            // Trả về 201 Created cùng location header
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, resultDto);
        }

        // GET: api/RevenueLogs/{id}
        [HttpGet("{id:int}", Name = "GetRevenueLogById")]
        public async Task<ActionResult<RevenueLogDTO>> GetById(int id)
        {
            var r = await _context.RevenueLogs.FindAsync(id);
            if (r == null)
                return NotFound();

            var dto = new RevenueLogDTO
            {
                Id = r.Id,
                EmployeeId = r.EmployeeId,
                PackageId = r.PackageId,
                Price = r.Price,
                Date = r.Date,
                IsActive = r.IsActive,
                CreateBy = r.CreateBy,
                CreateDate = r.CreateDate,
                UpdateBy = r.UpdateBy,
                UpdateDate = r.UpdateDate
            };
            return Ok(dto);
        }

        // PUT, DELETE… bạn có thể bổ sung nếu cần. Ví dụ để disable / cập nhật 1 revenue log
    }
}
