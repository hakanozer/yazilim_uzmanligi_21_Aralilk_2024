using AutoMapper;
using MVC.Dto;
using MVC.Models;

namespace MVC.Mappings
{
    public class AppProfile : Profile
    {
        public AppProfile()
        {
            // RegisterDto'dan User'a mapleme yaparken Name ve Surname'i ayırır.
            CreateMap<RegisterDto, User>();
        }
    }
}