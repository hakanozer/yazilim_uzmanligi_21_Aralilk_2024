using AutoMapper;
using FitnessRestApi.Dto;
using FitnessRestApi.Models;

namespace FitnessRestApi.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterDto, User>();
            CreateMap<LoginDto, User>();
            CreateMap<User, AuthJwtDto>();

            CreateMap<WorkoutDto, Workout>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date ?? System.DateTime.UtcNow));
            CreateMap<Workout, WorkoutDto>();

            CreateMap<GoalDto, Goal>();
            CreateMap<Goal, GoalDto>();
        }
    }
}
