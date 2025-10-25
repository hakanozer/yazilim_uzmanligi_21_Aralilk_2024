using AutoMapper;
using RestApi.Models;
using RestApi.Dto.UserDto;

namespace RestApi.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
        }
    }
}