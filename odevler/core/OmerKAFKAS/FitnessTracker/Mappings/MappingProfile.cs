using AutoMapper;
using FitnessTracker.Entities;
using FitnessTracker.DTOs;

namespace FitnessTracker.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Workout, WorkoutDto>().ReverseMap();
            CreateMap<Goal, GoalDto>().ReverseMap();
        }
    }
}

