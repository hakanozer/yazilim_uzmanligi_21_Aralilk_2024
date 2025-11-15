using AutoMapper;
using MVC.DTO;
using MVC.Models;

namespace MVC.Utils
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDto, User>()
                .ForMember(d => d.Password, o => o.MapFrom(s => BCrypt.Net.BCrypt.HashPassword(s.Password)));
        }
    }
}