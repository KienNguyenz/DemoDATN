using System.ComponentModel.DataAnnotations;

namespace DemoGym.Dtos
{
    public class CreateRevenueLogDTO
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public int PackageId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
    public class RevenueLogDTO
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public int PackageId { get; set; }

        public decimal Price { get; set; }

        public DateTime Date { get; set; }

        // Các trường từ BaseEntity (tuỳ chọn nếu muốn expose)
        public bool? IsActive { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
