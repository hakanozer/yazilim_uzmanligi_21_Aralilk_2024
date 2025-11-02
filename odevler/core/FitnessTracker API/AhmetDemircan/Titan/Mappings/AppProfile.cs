using AutoMapper;
using Titan.Models;
using Titan.Dto.UserDto;
using Titan.Dto.UserDto.GoalDto;

namespace Titan.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {
            // User
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserJwtDto>();

            // Aim
            CreateMap<AimDto, Aim>();
            CreateMap<Aim, AimDto>();
        }
    }
}