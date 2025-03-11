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

namespace DemoGym.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesListsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DevicesListsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/DevicesLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DevicesList>>> GetdevicesLists()
        {
            return await _context.devicesLists.ToListAsync();
        }

        // GET: api/DevicesLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DevicesList>> GetDevicesList(Guid id)
        {
            var devicesList = await _context.devicesLists.FindAsync(id);

            if (devicesList == null)
            {
                return NotFound();
            }

            return devicesList;
        }

        // PUT: api/DevicesLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevicesList(Guid id, DevicesList devicesList)
        {
            if (id != devicesList.Id)
            {
                return BadRequest();
            }

            _context.Entry(devicesList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DevicesListExists(id))
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

        // POST: api/DevicesLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DevicesList>> PostDevicesList(DevicesListDTO devicesListDTO)
        {
            var devicelist = new DevicesList
            {
                Id = Guid.NewGuid(),
                DeviceName = devicesListDTO.DeviceName,
                Quantity = devicesListDTO.Quantity,
                Origin = devicesListDTO.Origin,
                DeviceId = devicesListDTO.DeviceId,
            };

            _context.devicesLists.Add(devicelist);
            await _context.SaveChangesAsync();

            return Ok(devicelist);
        }

        // DELETE: api/DevicesLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevicesList(Guid id)
        {
            var devicesList = await _context.devicesLists.FindAsync(id);
            if (devicesList == null)
            {
                return NotFound();
            }

            _context.devicesLists.Remove(devicesList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DevicesListExists(Guid id)
        {
            return _context.devicesLists.Any(e => e.Id == id);
        }
    }
}
