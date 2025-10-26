using AutoMapper;
using RestApi.Models;
using RestApi.Dto.UserDto;
using RestApi.Dto.ServiceDto;

namespace RestApi.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {
            // User
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserJwtDto>();

            // Service
            CreateMap<ServiceAddDto, Service>();
        }
    }
}