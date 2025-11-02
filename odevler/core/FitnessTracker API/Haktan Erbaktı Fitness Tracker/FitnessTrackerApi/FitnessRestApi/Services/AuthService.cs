using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using FitnessRestApi.Utils;
using FitnessRestApi.Dto;
using FitnessRestApi.Models;

namespace FitnessRestApi.Services
{
    public class AuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _iConfiguration;
        public AuthService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _iConfiguration = configuration;
        }

        public User Register(RegisterDto registerDto)
        {
            var user = _mapper.Map<User>(registerDto);
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public AuthJwtDto? Login(LoginDto loginDto)
        {
            var user = _mapper.Map<User>(loginDto);
            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == loginDto.Email);
            if (existingUser != null)
            {
                // kullanıcı var, şifreyi kıyasla
                bool passwordVerify = BCrypt.Net.BCrypt.Verify(loginDto.Password, existingUser.Password);
                if (passwordVerify)
                {
                    // kullanıcı adı ve şifre başarılı
                    var userJwtDto = _mapper.Map<AuthJwtDto>(existingUser);
                    // Jwt generator
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var jwtKey = _iConfiguration.GetValue<string>("Jwt:Key") ?? "";
                    double ExpiresTime = 1;
                    var key = Encoding.ASCII.GetBytes(jwtKey);
                    var tokenDesc = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, existingUser.Email)
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
    
