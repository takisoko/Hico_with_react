﻿using Hico.Database;
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

            var typeByName = GetUnitTypeId(unit.TypeName);

            if (typeByName == 0)
                return false;
            var unitToCreate = new Unit()
            {
                Name = unit.Name,
                Type = typeByName,
                Active = true,
            };
            _dbContext.Add(unitToCreate);
            var success = await _dbContext.SaveChangesAsync();

            return success != 0 ? true : false;
        }

        public async Task<List<UnitDto>> GetAllUnits(UnitTypeEnum? type)
        {
            var units = await _dbContext.Units.Where(x => type == 0 || x.Type == type).ToListAsync();

            if (units == null)
                return new List<UnitDto>();

            var unitsResult = units.Select(x => new UnitDto()
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                TypeName = x.Type.ToString(),
                Active = x.Active,
            }).ToList();

            return unitsResult;
        }

        public async Task<List<UnitDto>> GetActiveUnits(UnitTypeEnum? type)
        {
            var units = await _dbContext.Units.Where(x => x.Active && (type == 0 || x.Type == type)).ToListAsync();

            if (units == null)
                return new List<UnitDto>();

            var unitsResult = units.Select(x => new UnitDto()
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                TypeName = x.Type.ToString(),
                Active = x.Active,
            }).ToList();

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
            unitTypes.Add(UnitTypeEnum.Mass.ToString());
            unitTypes.Add(UnitTypeEnum.Package.ToString());

            return unitTypes;
        }

        public UnitTypeEnum GetUnitTypeId(string typeName)
        {
            if(typeName == UnitTypeEnum.Length.ToString())
            {
                return UnitTypeEnum.Length;
            }
            else if (typeName == UnitTypeEnum.Volume.ToString())
            {
                return UnitTypeEnum.Volume;
            }
            else if (typeName == UnitTypeEnum.Mass.ToString())
            {
                return UnitTypeEnum.Mass;
            }
            else if (typeName == UnitTypeEnum.Package.ToString())
            {
                return UnitTypeEnum.Package;
            }

            return 0;
        }

        public async Task<bool> DeleteUnit(int id)
        {
            var unitToDelete = await GetUnitById(id);
            _dbContext.Remove(unitToDelete);
            var success = await _dbContext.SaveChangesAsync();
            return success != 0 ? true : false;
        }


        public async Task<bool> ToggleActiveUnit(int id)
        {
            var materialToInactivate = await GetUnitById(id);
            materialToInactivate.Active = !materialToInactivate.Active;
            var success = await _dbContext.SaveChangesAsync();
            return success != 0 ? true : false;
        }
    }
}
