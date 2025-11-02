using AutoMapper;
using FitnessTracker_API.Dto.Goal;
using FitnessTracker_API.Models;

namespace FitnessTracker_API.Mappings
{
    public class GoalProfile : Profile
    {
        public GoalProfile()
        {
            CreateMap<Goal, GoalResponseDto>();
            CreateMap<GoalAddDto, Goal>();
            CreateMap<GoalUpdateDto, Goal>();
        }
    }
}