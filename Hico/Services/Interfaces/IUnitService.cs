using Hico.Database.Models;
using Hico.Models;

namespace Hico.Services.Interfaces
{
    public interface IUnitService
    {
        Task<bool> CreateUnit(UnitDto unit);
        Task<Unit> GetUnitById(int id);
        List<string> GetUnitTypes();
        Task<List<UnitDto>> GetAllUnits(UnitTypeEnum? type);
        Task<bool> DeleteUnit(int id);
    }
}
