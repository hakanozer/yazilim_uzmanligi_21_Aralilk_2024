using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using WorkoutGoalApi.Dto.UserDto;
using WorkoutGoalApi.Models;
using WorkoutGoalApi.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace WorkoutGoalApi.Services
{
    public class UserService // UserService diye bir contractr oluşturduk
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper; //IMapper  microsoftun automapper kütüphanesinden geliyor ve _mapper  değişkeni oluşturduk
        private readonly IConfiguration _iConfiguration; 
        public UserService(ApplicationDbContext dbContext, IMapper mapper, IConfiguration configuration) // da ha önce kullanılmış  kavramları tekrar yazmamk adına injection 
        {
            _dbContext = dbContext; // dbcontext i kullanmak için atama yaptık
            _mapper = mapper;
            _iConfiguration = configuration;
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
            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == userLoginDto.Email); //Kullanıcı varlık denetimi
            if (existingUser != null)
            {
                //Kullanıcı var,şifreyi kıyasla
                bool passwordVerify = BCrypt.Net.BCrypt.Verify(userLoginDto.Password, existingUser.Password);
                if (passwordVerify)
                {
                    //Kullanıcı adı ve şifre başarılı
                    var userJwtDto = _mapper.Map<UserJwtDto>(existingUser);
                    //Jwt Generator
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var jwtKey = _iConfiguration.GetValue<string>("Jwt:Key") ?? "";
                    double ExpiresTime = 1;//1 saat hayatta kalacak
                    var key = Encoding.ASCII.GetBytes(jwtKey);//buradan bir byte dizisi elde edeceğiz
                    var tokenDesc = new SecurityTokenDescriptor
                    {
                        //Bir jwt üretilecek subject(konusunda)bu kişinin adı yer alacak
                        //Claims: yetkiyi alacak olan kişi
                        Subject = new ClaimsIdentity(new Claim[]
                            {
                                new Claim(ClaimTypes.NameIdentifier, existingUser.Id.ToString()), // Kullanıcı ID 
                                new Claim(ClaimTypes.Name, existingUser.Email) // E-posta
                            }),
                        Expires = DateTime.UtcNow.AddHours(ExpiresTime),
                        SigningCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha256Signature)
                    };
                    if (tokenDesc != null)
                    {
                        ParseRole(existingUser.Role, tokenDesc);
                    }
                    var token = tokenHandler.CreateToken(tokenDesc);//Önce burada token 'ı üretiyoruz.
                    var tokenString = tokenHandler.WriteToken(token);//WriteToken ile program içine yazıyoruz.
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