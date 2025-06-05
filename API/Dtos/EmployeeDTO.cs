using DemoGym.Entities;
using DemoGym.Entities.Common;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class EmployeeDTO : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NickName { get; set; } = null!;
        public string Describe { get; set; }
        public string Strength { get; set; }
        public string? Role { get; set; }
        public DateTime? Birthday { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
        public string? PictureUrl { get; set; }
        public int BranchId { get; set; }
        public int? Workingday { get; set; }
        public decimal? Salary { get; set; }
        [JsonIgnore]
        public virtual ICollection<PTMember> PTMembers { get; set; } = new List<PTMember>();
    }
    public class CreateEmployeeDTO
    {
        public string Name { get; set; } = null!;
        public string? NickName { get; set; }
        public string? Describe { get; set; }
        public string? Strength { get; set; }
        public string? Role { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PictureUrl { get; set; }
        public int BranchId { get; set; }
        public int? Workingday { get; set; }
    }
}
