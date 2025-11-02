using AutoMapper;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;

namespace FitnessTracker.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Workout mappings
        CreateMap<WorkoutCreateDto, Workout>();
        CreateMap<WorkoutUpdateDto, Workout>();
        CreateMap<Workout, WorkoutResponseDto>();

        // Goal mappings
        CreateMap<GoalCreateDto, Goal>();
        CreateMap<GoalUpdateDto, Goal>();
        CreateMap<Goal, GoalResponseDto>();
    }
}

