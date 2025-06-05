using DemoGym.Entities.Common;

namespace DemoGym.Dtos
{
    public class DeviceDto : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Origin { get; set; }
        public string Describe { get; set; }
        public int BranchId { get; set; }

    }
}
