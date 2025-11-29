using AutoMapper;
using MVC.Models;
using MVC.Dto.UserDto;

namespace MVC.Dto.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {
            CreateMap<UserRegisterDto, User>();
        }
    }
}