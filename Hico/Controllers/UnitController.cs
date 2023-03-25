using Hico.Database.Models;
using Hico.Models;
using Hico.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hico.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly IUnitService _unitService;
        public UnitController(IUnitService unitService)
        {
            _unitService = unitService;
        }
        /// <summary>
        /// Return a unit with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> UnitAsync(int id)
        {
            var result = await _unitService.GetUnitById(id);

            return Ok(result);
        }

        /// <summary>
        /// Return unit tpes.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("UnitTypes")]
        public async Task<IActionResult> UnitTypesAsync()
        {
            var result = _unitService.GetUnitTypes();

            return Ok(result.ToArray());
        }

        // <summary>
        /// Return a list of all units.
        /// </summary>
        /// <returns></returns>
        [HttpGet("AllUnits/{unitType}")]
        public async Task<IActionResult> Get(int unitType)
        {
            UnitTypeEnum? type = (UnitTypeEnum)unitType;
            var result = await _unitService.GetAllUnits(type);

            return Ok(result.ToArray());
        }

        /// <summary>
        /// Creates a unit.
        /// </summary>
        /// <returns></returns>
        [HttpPost()]
        public async Task<IActionResult> CreateUnitAsync(UnitDto unit)
        {
            var result = await _unitService.CreateUnit(unit);

            return Ok(result != null ? true : false);
        }

        /// <summary>
        /// Deletes a unit with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUnitAsync(int id)
        {
            var result = await _unitService.DeleteUnit(id);

            return Ok(result);
        }
    }
}
