namespace Hico.Models
{
    public class TaskMaterialUsageDto
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public UnitDto UnitOfMeasurement { get; set; }
        public MaterialDto Material { get; set; }
    }
}
