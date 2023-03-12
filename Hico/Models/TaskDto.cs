namespace Hico.Models
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TotalDuration { get; set; }
        public TaskMaterialUsageDto TaskMaterialUsage { get; set; }
    }
}
