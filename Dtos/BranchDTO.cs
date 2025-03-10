using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class BranchDTO
    {
        public string Name { get; set; } = null!;

        public string Address { get; set; } = null!;
        [JsonIgnore]
        public List<Member>? Members { get; set; }
        [JsonIgnore]
        public List<Employee>? Employees { get; set; }
        [JsonIgnore]
        public List<RoomDTO>? Rooms { get; set; }
        [JsonIgnore]
        public List<Package>? Packages { get; set; }
    }
}
