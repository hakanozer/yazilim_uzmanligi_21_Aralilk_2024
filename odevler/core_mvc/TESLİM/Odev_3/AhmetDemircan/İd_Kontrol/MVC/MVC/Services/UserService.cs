using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MVC.Dto.UserDto;
using MVC.Models;
using MVC.Utils;

namespace MVC.Services
{
    public class UserService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public UserService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public User? UserLogin(string Email, string Password)
        {
            var user =  _dbContext.Users.SingleOrDefault(u => u.Email == Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(Password, user.Password))
            {
                return null;
            }
            return user;
        }

        public User UserRegister(UserRegisterDto userRegisterDto)
        {
            var userEntity = _mapper.Map<User>(userRegisterDto);
            userEntity.Password = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Password);
            userEntity.Role = "User";
            _dbContext.Users.Add(userEntity);
            _dbContext.SaveChanges();
            return userEntity;
        }
    }
}