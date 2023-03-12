using System.ComponentModel.DataAnnotations;

namespace Hico.Database.Models
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TotalDuration { get; set; }
        public TaskMaterialUsage TaskMaterialUsage { get; set; }
    }
}
