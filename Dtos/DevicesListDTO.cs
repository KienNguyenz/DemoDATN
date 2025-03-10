using SMG.Entities;

namespace DemoGym.Dtos
{
    public class DevicesListDTO
    {
        public string? DeviceName { get; set; }
        public int Quantity { get; set; }
        public string? Origin { get; set; }
        public Guid DeviceId { get; set; }
        public virtual Device? Device { get; set; }
    }
}
