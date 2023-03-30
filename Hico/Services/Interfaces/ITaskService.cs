using Hico.Models;
using Hico.Models.ResultModels;

namespace Hico.Services.Interfaces
{
    public interface ITaskService
    {         
        Task<TaskResult> CreateTask(AddEditTaskDto Task); 
        Task<TaskResult> GetTaskById(Guid id);
        Task<TaskResult> UpdateTask(AddEditTaskDto Task);
        Task<TaskResult> DeleteTask(Guid id);
        Task<TasksListResult> GetAllTasks();
    }
}
