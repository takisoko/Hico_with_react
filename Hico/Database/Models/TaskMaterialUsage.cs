using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hico.Database.Models
{
    public class TaskMaterialUsage
    {
        [Key]
        public int Id { get; set; }
        public int Amount { get; set; }
        public Unit UnitOfMeasurement { get; set; }

        [ForeignKey("MaterialId")]
        public virtual Material Material { get; set; } 

    }
}
