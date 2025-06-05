using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Demo.Database;
using DemoGym.Dtos;
using DemoGym.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DevicesController(AppDbContext context)
            => _context = context;

        // GET: api/Devices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Devices>>> GetAll()
            => await _context.Devices.ToListAsync();

        // GET: api/Devices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Devices>> GetById(int id)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device == null) return NotFound();
            return device;
        }

        // POST: api/Devices
        [HttpPost]
        public async Task<ActionResult<Devices>> Create(DeviceDto dto)
        {
            var device = new Devices
            {
                Name = dto.Name,
                Type = dto.Type,
                Quantity = dto.Quantity,
                Price = dto.Price,
                Origin = dto.Origin,
                Describe = dto.Describe,
                BranchId = dto.BranchId,
                IsActive = dto.IsActive
            };

            _context.Devices.Add(device);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = device.Id }, device);
        }

        // PUT: api/Devices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DeviceDto dto)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device == null) return NotFound();

            device.Name = dto.Name;
            device.Type = dto.Type;
            device.Quantity = dto.Quantity;
            device.Price = dto.Price;
            device.Origin = dto.Origin;
            device.Describe = dto.Describe;
            device.BranchId = dto.BranchId;
            device.IsActive = dto.IsActive;

            _context.Entry(device).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device == null) return NotFound();

            _context.Devices.Remove(device);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
