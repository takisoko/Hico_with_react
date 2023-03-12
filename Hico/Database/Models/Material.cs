using System.ComponentModel.DataAnnotations;

namespace Hico.Database.Models
{
    public class Material
    {
        [Key]
        public Guid Id { get; set; }
        public string PartNumber { get; set; }
        public int ManufacturerCode { get; set; }
        public int Price { get; set; }
        public Unit UnitOfUsage { get; set; }
        public int UnitOfUsageId { get; set; }

        public virtual ICollection<TaskMaterialUsage> TaskMaterialUsages { get; set; }
    }
}
