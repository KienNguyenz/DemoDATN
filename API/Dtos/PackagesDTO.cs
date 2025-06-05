using DemoGym.Entities;
using DemoGym.Entities.Common;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class PackagesDTO : BaseEntity
    {
        public string PackageName { get; set; } = null!;

        public decimal? Price { get; set; }

        public string? Duration { get; set; }
        public int BranchId { get; set; }
        public string? Describe { get; set; }
        [JsonIgnore]
        public ICollection<Member> Members { get; set; } = new List<Member>();
    }
}
