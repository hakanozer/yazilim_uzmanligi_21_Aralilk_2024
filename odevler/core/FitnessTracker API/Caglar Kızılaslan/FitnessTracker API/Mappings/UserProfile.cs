using AutoMapper;
using FitnessTracker_API.Dto.UserDto;
using FitnessTracker_API.Models;
using FitnessTracker_API.UserDto;

namespace FitnessTracker_API.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            //DTO Nesnesi User Modeline Döndü
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            //User nesnesi, Dto Modeline dönüştü
            CreateMap<User, UserLoginSuccessDto>();
        }
    }
}