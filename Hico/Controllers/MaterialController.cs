﻿using Hico.Models;
using Hico.Models.ResultModels;
using Hico.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hico.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;
        private readonly IUnitService _unitService;
        public MaterialController(IMaterialService materialService, IUnitService unitService)
        {
            _materialService = materialService; 
            _unitService = unitService;
        }
        /// <summary>
        /// Return a material with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> MaterialAsync(Guid id)
        {
            var result = await _materialService.GetMaterialById(id);

            if(!result.success)
            {

                return NotFound();
            }
            var possibleUnits = await _unitService.GetAllUnitsWithGivenType(result.Material.UnitOfIssueId);

            return Ok(result);
        }

        // <summary>
        /// Return a list of all materials.
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "MaterialsList")]
        public async Task<IActionResult> MaterialsListAsync()
        {
            var result = await _materialService.GetAllMaterials();

            return Ok(result);
        }

        /// <summary>
        /// Updates a material.
        /// </summary>
        /// <param name="material"></param>
        /// <returns></returns>
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateMaterialAsync(MaterialDto material)
        {
            var result = await _materialService.UpdateMaterial(material);


            return Ok(result);
        }

        /// <summary>
        /// Deletes a material with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterialAsync(Guid id)
        {
            var result = await _materialService.DeleteMaterial(id);

            return Ok(result);
        }

        /// <summary>
        /// Creates a material.
        /// </summary>
        /// <returns></returns>
        [HttpPost()]
        public async Task<IActionResult> CreateMaterialAsync(MaterialDto material)
        {
            var result = await _materialService.CreateMaterial(material);

            return Ok(result);
        }
    }
}