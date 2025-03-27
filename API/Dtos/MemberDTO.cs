using DemoGym.Entities;
using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class MemberDTO
    {
        public string MemName { get; set; } = null!;

        public DateOnly? Birthday { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
        public int PackageId { get; set; }
        [JsonIgnore]
        public Package? Package { get; set; }
        [JsonIgnore]
        public virtual PTMember? PTMember { get; set; }

    }
}
