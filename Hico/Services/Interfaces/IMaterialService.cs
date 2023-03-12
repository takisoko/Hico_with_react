using Hico.Database.Models;
using Hico.Models;
using Hico.Models.ResultModels;

namespace Hico.Services.Interfaces
{
    public interface IMaterialService
    {
        Task<MaterialResult> GetMaterialById(Guid id);
        Task<MaterialResult> DeleteMaterial(Guid id);
        Task<MaterialResult> UpdateMaterial(MaterialDto material);
        Task<MaterialResult> CreateMaterial(MaterialDto material);
        Task<MaterialsListResult> GetAllMaterials();
        Task<Material> GetMaterial(Guid id);
    }
}
