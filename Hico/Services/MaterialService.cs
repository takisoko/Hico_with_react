using Hico.Database;
using Hico.Database.Models;
using Hico.Models;
using Hico.Models.ResultModels;
using Hico.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Hico.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUnitService _unitService;
        public MaterialService(ApplicationDbContext dbContext, IUnitService unitService)
        {
            _dbContext = dbContext;
            _unitService = unitService;
        }

        public async Task<Material> GetMaterial(Guid id)
        {
            var material = await _dbContext.Materials.Where(x => x.Id == id).Include(x => x.UnitOfUsage).FirstOrDefaultAsync();
            return material;
        }

        public async Task<MaterialResult> GetMaterialById(Guid id)
        {
            var material = await GetMaterial(id);
            if (material == null)
                return new MaterialResult()
                {
                    Material = null,
                    success = false,
                };

            var materialResult = new MaterialDto()
            {
                Id = material.Id,
                ManufacturerCode = material.ManufacturerCode,
                PartNumber = material.PartNumber,
                Price = material.Price,
                UnitOfIssueId = material.UnitOfUsageId
            };
            return new MaterialResult()
            {
                Material = materialResult,
                success = true,
            };
        }


        public async Task<MaterialsListResult> GetAllMaterials()
        {
            var materials = await _dbContext.Materials.Include(x => x.UnitOfUsage).ToListAsync();
            if (materials == null)
                return new MaterialsListResult()
                {
                    Materials = null,
                    success = false,
                };

            var materialsResult = materials.Select(x => new MaterialDto()
            {
                Id = x.Id,
                ManufacturerCode = x.ManufacturerCode,
                PartNumber = x.PartNumber,
                Price = x.Price,
                UnitOfIssue = new UnitDto()
                {
                    Id = x.UnitOfUsage.Id,
                    Name = x.UnitOfUsage.Name,
                    Type = x.UnitOfUsage.Type,
                    TypeName = x.UnitOfUsage.Type.ToString(),
                }
            }).ToList();
             
            return new MaterialsListResult()
            {
                Materials = materialsResult,
                success = true,
            };
        }

        public async Task<MaterialResult> UpdateMaterial(MaterialDto material)
        {
            var materialToUpdate = await GetMaterial(material.Id);

            var unit = await _unitService.GetUnitById(material.UnitOfIssueId);
            var previousUnit = await _unitService.GetUnitById(materialToUpdate.UnitOfUsageId);

            if (previousUnit != null && unit != null && previousUnit.Type != unit.Type)
            {
                return new MaterialResult()
                {
                    success = false
                };
            }

            materialToUpdate.PartNumber = material.PartNumber;
            materialToUpdate.Price = material.Price;
            materialToUpdate.ManufacturerCode = material.ManufacturerCode;
            materialToUpdate.UnitOfUsage = unit;

            var success = await _dbContext.SaveChangesAsync();

            return new MaterialResult()
            {
                Material = material,
                success = success != 0 ? true : false
            };
        }

        public async Task<MaterialResult> DeleteMaterial(Guid id)
        {
            var materialToDelete = await GetMaterial(id);
            _dbContext.Remove(materialToDelete);
            var success = await _dbContext.SaveChangesAsync();
            return new MaterialResult()
            {
                success = success != 0 ? true : false
            };
        }

        public async Task<MaterialResult> CreateMaterial(MaterialDto material)
        {
            var unit = await _unitService.GetUnitById(material.UnitOfIssue.Id);

            if(unit == null)
                return new MaterialResult()
                {
                    Material = null,
                    success = false
                };

            var materialToCreate = new Material()
            {
                PartNumber = material.PartNumber,
                Price = material.Price,
                ManufacturerCode = material.ManufacturerCode,
                UnitOfUsage = unit

            };

            _dbContext.Add(materialToCreate);
            var success = await _dbContext.SaveChangesAsync();

            return new MaterialResult()
            {
                Material = material,
                success = success != 0 ? true : false
            };
        }
    }
}
