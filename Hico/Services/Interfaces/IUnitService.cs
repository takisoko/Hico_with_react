using Hico.Database.Models;
using Hico.Models;

namespace Hico.Services.Interfaces
{
    public interface IUnitService
    {
        Task<bool> CreateUnit(UnitDto unit);
        Task<Unit> GetUnitById(int id);
        List<string> GetUnitTypes();
        Task<List<UnitDto>> GetAllUnits();
        Task<List<UnitDto>> GetAllUnitsWithGivenType(int unitId);
        Task<bool> DeleteUnit(int id);
    }
}
