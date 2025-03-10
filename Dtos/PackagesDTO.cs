using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class PackagesDTO
    {
        public string PackageName { get; set; } = null!;

        public decimal? Price { get; set; }

        public string? Duration { get; set; }
        public Guid BranchId { get; set; }
        [JsonIgnore]
        public virtual Member? Member { get; set; }
    }
}
