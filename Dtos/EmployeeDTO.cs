using DemoGym.Entities;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class EmployeeDTO
    {
        public string Name { get; set; } = null!;

        public string? Role { get; set; }

        public DateOnly? Birthday { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
        public Guid BranchId { get; set; }
        [JsonIgnore]
        public virtual Salary? Salary { get; set; }
        [JsonIgnore]
        public virtual ICollection<PTMember> PTMembers { get; set; } = new List<PTMember>();
    }
}
