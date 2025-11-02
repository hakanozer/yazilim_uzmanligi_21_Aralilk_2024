using AutoMapper;
using FitnessTracker_API.Dto.Workout;
using FitnessTracker_API.Models;

namespace FitnessTracker_API.Mappings
{
    public class WorkoutProfile : Profile
    {
        public WorkoutProfile()
        {
            CreateMap<WorkoutAddDto, Workout>();
            CreateMap<WorkoutUpdateDto, Workout>();
            CreateMap<Workout, WorkoutResponseDto>();
        }
    }
}