using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using DemoGym.Entities;
using System.Text.Json.Serialization;
using DemoGym.Entities.Common;

namespace DemoGym.Entities
{
    public partial class Devices : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [Required, MaxLength(100)]
        public string Type { get; set; }

        /// <summary>
        /// Thời lượng (theo đơn vị bạn định nghĩa, ví dụ số ngày hoặc phút)
        /// </summary>
        [Required]
        public int Quantity { get; set; }

        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [MaxLength(255)]
        public string Origin { get; set; }
        [MaxLength(255)]
        public string Describe { get; set; }

        [Required]
        public int BranchId { get; set; }

        [ForeignKey(nameof(BranchId))]
        [JsonIgnore]
        public virtual Branch Branch { get; set; }
    }
}
