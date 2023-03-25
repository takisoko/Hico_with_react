namespace Hico.Models.ResultModels
{
    public class MaterialResult
    {
        public MaterialDto Material { get; set; }
        public bool success { get; set; }
        public string Message { get; set; } = "";
    }
}
