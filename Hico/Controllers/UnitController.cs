﻿using Hico.Database.Models;
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

            return Ok(result);
        }

        // <summary>
        /// Return a list of all units.
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetUnit")]
        public async Task<IActionResult> Get()
        {
            var result = await _unitService.GetAllUnits();

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
    }
}