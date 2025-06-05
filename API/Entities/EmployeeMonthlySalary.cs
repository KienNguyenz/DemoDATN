using DemoGym.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DemoGym.Entities.Common;

namespace DemoGym.Entities
{
    public class EmployeeMonthlySalary : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        // Khóa ngoại đến Employee
        [ForeignKey(nameof(Employee))]
        public int EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }

        [Range(1, 12)]
        public int Month { get; set; }       // 1..12

        [Range(2000, 2100)]
        public int Year { get; set; }        // ví dụ: 2025


        public int WorkingDays { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal SalaryAmount { get; set; }
    }
}
