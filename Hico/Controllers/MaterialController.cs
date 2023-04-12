using Hico.Models;
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
        
        // <summary>
        /// Return a list of all active  materials.
        /// </summary>
        /// <returns></returns>
        [HttpGet("ActiveMaterials")]
        public async Task<IActionResult> ActiveMaterialsListAsync()
        {
            var result = await _materialService.GetActiveMaterials();

            return Ok(result);
        }

        /// <summary>
        /// Updates a material.
        /// </summary>
        /// <param name="material"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateMaterialAsync(AddEditMaterialDto material)
        {
            var result = await _materialService.UpdateMaterial(material);

            if(!result.success)
            {
                return BadRequest(result);
            }

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
        /// Toggles if material with given id is active.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("ToggleActive/{id}")]
        public async Task<IActionResult> ToggleActiveMaterialAsync(Guid id)
        {
            var result = await _materialService.ToggleActiveMaterial(id);

            return Ok(result);
        }

        /// <summary>
        /// Creates a material.
        /// </summary>
        /// <returns></returns>
        [HttpPost()]
        public async Task<IActionResult> CreateMaterialAsync(AddEditMaterialDto material)
        {
            var result = await _materialService.CreateMaterial(material);

            return Ok(result);
        }
    }
}
