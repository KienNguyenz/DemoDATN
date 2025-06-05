using DemoGym.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Entities
{
    public class Salary
    {
        public int Id { get; set; }
        public string? role { get; set; }
        public int WorkingDay { get; set; }
        public decimal SalaryE { get; set; }
        public int EmployeeId { get; set; }
        [JsonIgnore]
        public virtual Employee? Employee { get; set; }
    }
}
