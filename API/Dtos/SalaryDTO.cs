using SMG.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class SalaryDTO
    {
        public string? role { get; set; }
        public int WorkingDay { get; set; }
        public double SalaryE { get; set; }
        public Guid EmployeeId { get; set; }
        [JsonIgnore]
        public virtual Employee? Employee { get; set; }
    }
}
