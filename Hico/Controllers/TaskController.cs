using Hico.Models;
using Hico.Models.ResultModels;
using Hico.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hico.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        // <summary>
        /// Return a list of all tasks.
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "TasksList")]
        public async Task<IActionResult> Get()
        {
            var result = await _taskService.GetAllTasks();

            return Ok(result);
        }

        /// <summary>
        /// Return a task with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> TaskAsync(Guid id)
        {
            var result = await _taskService.GetTaskById(id);

            if (!result.success)
            {

                return NotFound();
            }
            return Ok(result);
        }


        /// <summary>
        /// Updates a task.
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateTaskAsync(AddEditTaskDto task)
        {
            var result = await _taskService.UpdateTask(task);


            return Ok(result);
        }

        /// <summary>
        /// Deletes a task with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskAsync(Guid id)
        {
            var result = await _taskService.DeleteTask(id);

            return Ok(result);
        }

        /// <summary>
        /// Creates a task.
        /// </summary>
        /// <returns></returns>
        [HttpPost()]
        public async Task<IActionResult> CreateTaskAsync(AddEditTaskDto task)
        {
            var result = await _taskService.CreateTask(task);

            return Ok(result);
        }
    }
}
