namespace DemoGym.Dtos
{
    public class EmployeeMonthlySalaryDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int WorkingDays { get; set; }
        public decimal SalaryAmount { get; set; }

        // Từ BaseEntity:
        public bool? IsActive { get; set; }
        public string? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class CreateMonthlySalaryDTO
    {
        public int EmployeeId { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int WorkingDays { get; set; }


    }
}
