using System.ComponentModel.DataAnnotations.Schema;

namespace DemoGym.Entities.Common
{
    public interface IBaseEntity
    {
        string? CreateBy { get; set; }
        string? UpdateBy { get; set; }
        DateTime? CreateDate { get; set; }
        DateTime? UpdateDate { get; set; }
    }
    public class BaseEntity : IBaseEntity
    {
        [Column("IsActive")]
        public bool? IsActive { get; set; }

        [Column("CreateBy", TypeName = "NVARCHAR(50)")]
        public string? CreateBy { get; set; }

        [Column("UpdateBy", TypeName = "NVARCHAR(50)")]
        public string? UpdateBy { get; set; }

        [Column("CreateDate")]
        public DateTime? CreateDate { get; set; }

        [Column("UpdateDate")]
        public DateTime? UpdateDate { get; set; }
    }
}
