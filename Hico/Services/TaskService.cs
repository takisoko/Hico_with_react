using AutoMapper;
using Hico.Database;
using Hico.Database.Models;
using Hico.Models;
using Hico.Models.ResultModels;
using Hico.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hico.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUnitService _unitService;
        private readonly IMaterialService _materialService;
        private readonly IMapper _mapper;
        public TaskService(ApplicationDbContext dbContext, IUnitService unitService, IMaterialService materialService, IMapper mapper)
        {
            _dbContext = dbContext;
            _unitService = unitService;
            _materialService = materialService;
            _mapper = mapper;
        }

        public async Task<TaskResult> CreateTask(AddEditTaskDto Task)
        {
            var unit = await _unitService.GetUnitById(Task.UnitOfMeasurementId);
            var material = await _materialService.GetMaterial(Task.MaterialId);

            var TaskToCreate = new Hico.Database.Models.Task()
            {
                Description = Task.Description,
                Name = Task.Name,
                TotalDuration = Task.TotalDuration,

            };


            var taskUsage = new TaskMaterialUsage()
            {
                Amount = Task.Amount,
                UnitOfMeasurement = unit,
                Material = material
            };

            TaskToCreate.TaskMaterialUsage = taskUsage;

            _dbContext.Add(TaskToCreate);
            var success = await _dbContext.SaveChangesAsync();

            return new TaskResult()
            {
                Task = new TaskDto()
                {
                    Name = Task.Name,
                },
                success = success != 0 ? true : false
            };
        }

        public async Task<TaskResult> DeleteTask(Guid id)
        {
            var TaskToDelete = await GetTask(id);
            _dbContext.Remove(TaskToDelete);
            var success = await _dbContext.SaveChangesAsync();
            return new TaskResult()
            {
                success = success != 0 ? true : false
            };
        }

        public async Task<TasksListResult> GetAllTasks()
        {
            var tasks = await _dbContext.Tasks
                .Include(x => x.TaskMaterialUsage).ThenInclude(x => x.Material).ThenInclude(x => x.UnitOfUsage)
                .Include(x => x.TaskMaterialUsage).ThenInclude(x => x.UnitOfMeasurement).ToListAsync();
            return new TasksListResult()
            {
                Tasks = _mapper.Map<List<TaskDto>>(tasks),
                success = true
            };
        }
        private async Task<Hico.Database.Models.Task> GetTask(Guid id)
        {
            var task = await _dbContext.Tasks.Where(x => x.Id == id)
                .Include(x => x.TaskMaterialUsage).ThenInclude(x => x.Material)
                .Include(x => x.TaskMaterialUsage).ThenInclude(x => x.UnitOfMeasurement).FirstOrDefaultAsync();
            return task;
        }

        public async Task<TaskResult> GetTaskById(Guid id)
        {
            var task = await GetTask(id);
            if (task == null)
                return new TaskResult()
                {
                    Task = null,
                    success = false,
                };

            var taskResult = _mapper.Map<TaskDto>(task);

            return new TaskResult()
            {
                Task = taskResult,
                success = true,
            };
        }

        public async Task<TaskResult> UpdateTask(AddEditTaskDto Task)
        {
            var TaskToUpdate = await GetTask(Task.Id);

            var unit = await _unitService.GetUnitById(Task.UnitOfMeasurementId);
            var material = await _materialService.GetMaterial(Task.MaterialId);

            if (unit == null)
            {
                return new TaskResult()
                {
                    success = false,
                    Message = "Unit not found"
                };
            }
            else if (material.UnitOfUsage.Type != unit.Type)
            {
                return new TaskResult()
                {
                    success = false,
                    Message = "Unit must be of the same type as material's unit"
                };
            }

            TaskToUpdate.TotalDuration = Task.TotalDuration;
            TaskToUpdate.Description = Task.Description;
            TaskToUpdate.Name = Task.Name;
            TaskToUpdate.TaskMaterialUsage.UnitOfMeasurement = unit;
            TaskToUpdate.TaskMaterialUsage.Amount = Task.Amount;
            TaskToUpdate.TaskMaterialUsage.Material = material;

            var success = await _dbContext.SaveChangesAsync();

            return new TaskResult()
            {
                Task = new TaskDto()
                {
                    Name = Task.Name,
                },
                success = success != 0 ? true : false
            };
        }
    }
}
