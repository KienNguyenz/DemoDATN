using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Entities
{
    public class PTMember
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid MemberId { get; set; }  
        [JsonIgnore]
        public virtual Employee Employee { get; set; } = null!;

        [JsonIgnore]
        public virtual Member Member { get; set; } = null!;
    }
}
