using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class DevicesListDTO
    {
        public string? DeviceName { get; set; }
        public int Quantity { get; set; }
        public string? Origin { get; set; }
        public Guid DeviceId { get; set; }
        [JsonIgnore]
        public virtual Device? Device { get; set; }
    }
}
