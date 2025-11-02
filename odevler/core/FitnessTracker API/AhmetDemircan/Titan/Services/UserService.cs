using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using Titan.Dto.UserDto;
using Titan.Models;
using Titan.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Titan.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _iConfiguration;
        public UserService(ApplicationDbContext dbContext, IMapper mapper, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _iConfiguration = configuration;
        }

        public User Register(UserRegisterDto userRegisterDto)
        {
            var user = _mapper.Map<User>(userRegisterDto);
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
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
                    var jwtKey = _iConfiguration.GetValue<string>("Jwt:Key") ?? "";
                    double ExpiresTime = 1; // 1 saat
                    var key = Encoding.ASCII.GetBytes(jwtKey);
                    var tokenDesc = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, existingUser.Id.ToString()),
                            new Claim(ClaimTypes.Email, existingUser.Email)
                        }),
                        Expires = DateTime.UtcNow.AddHours(ExpiresTime),
                        SigningCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature
                        )
                    };
                    var token = tokenHandler.CreateToken(tokenDesc);
                    var tokenString = tokenHandler.WriteToken(token);
                    userJwtDto.Jwt = tokenString;
                    return userJwtDto;
                }
            }
            return null;
        }
    
    }
}