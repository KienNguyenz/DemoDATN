using DemoGym.Entities;
using DemoGym.Entities.Common;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class RoomDTO : BaseEntity
    {
        public string RoomName { get; set; } = null!;
        public int BranchId { get; set; }

    }
}
