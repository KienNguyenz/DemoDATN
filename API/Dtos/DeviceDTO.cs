using DemoGym.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class DeviceDTO
    {
        public string DeviceType { get; set; } = null!;
        public Guid RoomId { get; set; }
        [JsonIgnore]
        public virtual DevicesList? DevicesList { get; set; }
    }
}
