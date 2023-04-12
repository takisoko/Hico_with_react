namespace Hico.Models
{
    public class MaterialDto
    {
        public Guid Id { get; set; }
        public string PartNumber { get; set; }
        public int ManufacturerCode { get; set; }
        public int Price { get; set; }
        public int UnitOfIssueId { get; set; }
        public bool Active { get; set; }
        public UnitDto UnitOfIssue { get; set; }
    }
}
