namespace Hico.Models
{
    public class AddEditTaskDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TotalDuration { get; set; }
        public int Amount { get; set; }
        public int UnitOfMeasurementId { get; set; }
        public Guid MaterialId { get; set; }
    }
}
