using AutoMapper;
using MVC.DTOs;
using MVC.Models;

namespace MVC.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterDto, User>();
    }
}