using Hico.Database;
using Hico.Database.Models;
using Hico.Models;
using Hico.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hico.Services
{
    public class UnitService : IUnitService
    {
        private readonly ApplicationDbContext _dbContext;
        public UnitService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> CreateUnit(UnitDto unit)
        {

            var unitToCreate = new Unit()
            {

                Id = unit.Id,
                Name = unit.Name,
                Type = unit.Type,

            };
            _dbContext.Add(unitToCreate);
            var success = await _dbContext.SaveChangesAsync();

            return success != 0 ? true : false;
        }

        public async Task<List<UnitDto>> GetAllUnits()
        {
            var units = await _dbContext.Units.ToListAsync();
            if (units == null)
                return new List<UnitDto>();

            var unitsResult = units.Select(x => new UnitDto()
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                TypeName = x.Type.ToString(),
            }).ToList();

            return unitsResult;
        }

        public async Task<List<UnitDto>> GetAllUnitsWithGivenType(int unitId)
        {
            var allUnits = await GetAllUnits();
            var unit = allUnits.Where(x => x.Id == unitId).FirstOrDefault();

            if (unit == null)
                return new List<UnitDto>();

            var unitsResult = allUnits.Where(x => x.Type == unit.Type).ToList();
            return unitsResult;
        }

        public async Task<Unit> GetUnitById(int id)
        {
            var unit = await _dbContext.Units.Where(x => x.Id == id).FirstOrDefaultAsync();
            return unit;
        }

        public List<string> GetUnitTypes()
        {
            var unitTypes = new List<string>();
            unitTypes.Add(UnitTypeEnum.Volume.ToString());
            unitTypes.Add(UnitTypeEnum.Length.ToString());

            return unitTypes;
        }
    }
}
