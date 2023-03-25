namespace Hico.Models
{
    public class AddEditMaterialDto
    {
        public Guid Id { get; set; }
        public string PartNumber { get; set; }
        public int ManufacturerCode { get; set; }
        public int Price { get; set; }
        public int UnitOfIssueId { get; set; }
    }
}
