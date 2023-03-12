using System.ComponentModel.DataAnnotations;

namespace Hico.Database.Models
{
    public class Unit
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public UnitTypeEnum Type { get; set; }
    }
}
