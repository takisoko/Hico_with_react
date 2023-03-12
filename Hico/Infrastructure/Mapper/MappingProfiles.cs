using AutoMapper;
using Hico.Database.Models;
using Hico.Models;

namespace Hico.Infrastructure.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Database.Models.Task, TaskDto>().ReverseMap();
            CreateMap<TaskMaterialUsage, TaskMaterialUsageDto>().ReverseMap();
            CreateMap<Material, MaterialDto>().ReverseMap();
            CreateMap<Unit, UnitDto>().ReverseMap();
        }
    }
}