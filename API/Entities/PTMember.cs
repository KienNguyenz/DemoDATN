using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Entities
{
    public class PTMember
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int MemberId { get; set; }  
        [JsonIgnore]
        public virtual Employee Employee { get; set; } = null!;

        [JsonIgnore]
        public virtual Member Member { get; set; } = null!;
    }
}
