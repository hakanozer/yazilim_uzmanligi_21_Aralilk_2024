using AutoMapper;
using MVC.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterDto, User>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email.Trim().ToLowerInvariant()))
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()); // Hash'i manuel yapacağız
    }
}

