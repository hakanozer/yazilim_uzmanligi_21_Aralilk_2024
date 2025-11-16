using AutoMapper;
using MVC.Models;
using MVC.Dto;

namespace MVC.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {
            // User
            CreateMap<RegisterDto, User>();
           
        }
    }
}