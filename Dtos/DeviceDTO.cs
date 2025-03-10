using DemoGym.Entities;

namespace DemoGym.Dtos
{
    public class DeviceDTO
    {
        public string DeviceType { get; set; } = null!;
        public Guid RoomId { get; set; }
        public virtual DevicesList? DevicesList { get; set; }
    }
}
