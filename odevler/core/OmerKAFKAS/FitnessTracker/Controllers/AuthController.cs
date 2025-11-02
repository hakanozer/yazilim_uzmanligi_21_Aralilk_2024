using FitnessTracker.API.Services;
using FitnessTracker.Services;
using FitnessTracker.DTOs;
using FitnessTracker.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly UserService _userService;

        public AuthController(TokenService tokenService, UserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            try
            {
                var createdUser = await _userService.CreateAsync(userDto);
                return Ok(new { message = "Kullanıcı başarıyla oluşturuldu", user = createdUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Kullanıcı oluşturulamadı", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var users = await _userService.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email == loginDto.Email);

            if (user != null)
            {
                var userEntity = new User 
                { 
                    Id = user.Id, 
                    Username = user.Username, 
                    Email = user.Email 
                };
                
                var token = _tokenService.CreateToken(userEntity);
                return Ok(new { token = token, user = user });
            }

            return Unauthorized(new { message = "Geçersiz giriş bilgileri" });
        }
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}