using SMG.Entities;

namespace DemoGym.Dtos
{
    public class SalaryDTO
    {
        public string? role { get; set; }
        public int WorkingDay { get; set; }
        public double SalaryE { get; set; }
        public Guid EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
