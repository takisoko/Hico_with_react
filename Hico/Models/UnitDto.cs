using Hico.Database.Models;

namespace Hico.Models
{
    public class UnitDto
    {       
        public int Id { get; set; }
        public string Name { get; set; }
        public UnitTypeEnum Type { get; set; }
        public string TypeName { get; set; }
    }
}
