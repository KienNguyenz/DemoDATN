using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class RoomDTO
    {
        public string RoomName { get; set; } = null!;
        public Guid BranchId { get; set; }
        [JsonIgnore]
        public List<Device>? Device { get; set; }
    }
}
