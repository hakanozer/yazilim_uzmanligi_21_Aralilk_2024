using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using FitnessTracker_API.Dto.UserDto;
using FitnessTracker_API.Models;
using FitnessTracker_API.UserDto;
using FitnessTracker_API.Utils;
using Microsoft.IdentityModel.Tokens;

namespace FitnessTracker_API.Services
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
            var user = _mapper.Map<User>(userRegisterDto); // User- userregisterdto dönüşümü
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public UserLoginSuccessDto? Login(UserLoginDto userLoginDto)
        {
            var user = _mapper.Map<User>(userLoginDto); // User-Userlogindto dönüşümü
            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == userLoginDto.Email); // kullanıcının Db üzerinde varlığını sorgula
            if (existingUser != null)
            {
                // Null değilse-Kullanıcı Db'de var, şifreyi kıyasla
                bool passwordVerify = BCrypt.Net.BCrypt.Verify(userLoginDto.Password, existingUser.Password);
                if (passwordVerify)
                {
                    // Kullanıcı adı ve şifre doğru ise
                    var userLoginSuccessDto = _mapper.Map<UserLoginSuccessDto>(existingUser);
                    // Jwt Oluşturma
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var jwtKey = _iConfiguration.GetValue<string>("Jwt:Key") ?? "";
                    double ExpiresTime = 1; // 1 saat
                    var key = Encoding.ASCII.GetBytes(jwtKey);
                    var tokenDesc = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name, existingUser.Email),
                            new Claim(ClaimTypes.NameIdentifier, existingUser.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddHours(ExpiresTime),
                        SigningCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature
                        )
                    };
                    var token = tokenHandler.CreateToken(tokenDesc);
                    var tokenString = tokenHandler.WriteToken(token);
                    userLoginSuccessDto.Jwt = tokenString;
                    return userLoginSuccessDto;
                }

            }
            return null; // Null-Kullanıcı Db'de yok.

        }
        
    }
}