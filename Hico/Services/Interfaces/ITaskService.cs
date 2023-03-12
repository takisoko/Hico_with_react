using Hico.Models;
using Hico.Models.ResultModels;

namespace Hico.Services.Interfaces
{
    public interface ITaskService
    {         
        Task<TaskResult> CreateTask(TaskDto Task); 
        Task<TaskResult> GetTaskById(Guid id);
        Task<TaskResult> UpdateTask(TaskDto Task);
        Task<TaskResult> DeleteTask(Guid id);
        Task<TasksListResult> GetAllTasks();
    }
}
