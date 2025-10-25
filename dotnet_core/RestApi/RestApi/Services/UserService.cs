using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using RestApi.Dto.UserDto;
using RestApi.Models;
using RestApi.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace RestApi.Services
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

        public User Register(UserRegisterDto userRegisterDto)
        {
            var user = _mapper.Map<User>(userRegisterDto);
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Role = "User"; // Default role
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public UserJwtDto? Login(UserLoginDto userLoginDto)
        {
            var user = _mapper.Map<User>(userLoginDto);
            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == userLoginDto.Email);
            if (existingUser != null)
            {
                // kullanıcı var, şifreyi kıyasla
                bool passwordVerify = BCrypt.Net.BCrypt.Verify(userLoginDto.Password, existingUser.Password);
                if (passwordVerify)
                {
                    // kullanıcı adı ve şifre başarılı
                    var userJwtDto = _mapper.Map<UserJwtDto>(existingUser);
                    // Jwt generator
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var jwtKey = "asd123";
                    double ExpiresTime = 1; // 1 saat
                    var key = Encoding.ASCII.GetBytes(jwtKey);
                    var tokenDesc = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, existingUser.Email)
                        }),
                        Expires = DateTime.UtcNow.AddHours(ExpiresTime)
                    };
                    if (tokenDesc != null)
                    {
                        ParseRole(existingUser.Role, tokenDesc);
                    }
                    var token = tokenHandler.CreateToken(tokenDesc);
                    var tokenString = tokenHandler.WriteToken(token);
                    userJwtDto.Jwt = tokenString;
                    return userJwtDto;
                }
            }
            return null;
        }
        
        private void ParseRole(string roles, SecurityTokenDescriptor tokenDescriptor)
        {
            var roleList = roles.Split(',').Select(r => r.Trim()).ToList();
            foreach (var role in roleList)
            {
                tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));
            }
        }
    
    }
}