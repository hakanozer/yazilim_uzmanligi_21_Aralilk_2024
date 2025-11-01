namespace FitnessTracker.Mapping;

using AutoMapper;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Workout, WorkoutDto>().ReverseMap();
        CreateMap<Goal, GoalDto>().ReverseMap();
        CreateMap<WorkoutCreateUpdateDto, Workout>();
        CreateMap<GoalCreateUpdateDto, Goal>();
    }
}