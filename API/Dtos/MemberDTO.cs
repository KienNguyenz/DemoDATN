using DemoGym.Entities;
using DemoGym.Entities.Common;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DemoGym.Dtos
{
    public class MemberDTO : BaseEntity
    {
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
        public string? Email { get; set; }
        public DateTime? Birthday { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
        [Required(ErrorMessage = "Bạn phải chọn gói thành viên.")]
        public int? PackageId { get; set; }
        public string? Picture { get; set; }
        public string? AspNetUserID { get; set; }
        public int? BranchId { get; set; }
        public DateTime? DueDate { get; set; }
        [JsonIgnore]
        public virtual Branch? Branch { get; set; }
        [JsonIgnore]
        public Package? Package { get; set; }
        [JsonIgnore]
        public virtual PTMember? PTMember { get; set; }

    }
}
