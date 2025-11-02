
using AutoMapper;
using ActivityLogApi.Models;
using ActivityLogApi.Dto.UserDto;
using ActivityLogApi.Dto.WorkoutDto;
using ActivityLogApi.Dto.GoalDto;


namespace ActivityLogApi.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {

            //USER
            CreateMap<UserRegisterDto, User>();// DTO'umuz Entity'e dönüşüyor burada
            CreateMap<UserLoginDto, User>();//Cerate Map'ın içerinde dto yolluyoruz ve buradan geriye user bekliyorum demektir
            CreateMap<User, UserJwtDto>();

           // WORKOUT
            CreateMap<Workout, WorkoutDto>();
            CreateMap<WorkoutCreateDto, Workout>();
            CreateMap<WorkoutUpdateDto, Workout>();

            // GOAL
            CreateMap<Goal, GoalDto>();
            CreateMap<GoalCreateDto, Goal>();
            CreateMap<GoalUpdateDto, Goal>();
        }
    }
}
