using AutoMapper;
using WorkoutGoalApi.Models;
using WorkoutGoalApi.Dto.UserDto;
using WorkoutGoalApi.Dto.WorkoutDto;
using WorkoutGoalApi.Dto.GoalDto;

namespace WorkoutGoalApi.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {
            // User
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserJwtDto>(); // userdan userJwtDTO'ya dönüşüm

            // Workout Mappings
            CreateMap<Workout, WorkoutDto>();
            CreateMap<CreateWorkoutDto, Workout>();
            CreateMap<UpdateWorkoutDto, Workout>();

            // Goal Mappings
            CreateMap<Goal, GoalDto>();
            CreateMap<CreateGoalDto, Goal>();
            CreateMap<UpdateGoalDto, Goal>();
        }

    }
}