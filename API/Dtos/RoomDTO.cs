using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class RoomDTO
    {
        public string RoomName { get; set; } = null!;
        public int BranchId { get; set; }

    }
}
