using Microsoft.AspNetCore.Mvc;
using FitnessRestApi.Services;
using FitnessRestApi.Dto;

namespace FitnessRestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto registerDto)
        {
            var user = _authService.Register(registerDto);
            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var userJwtDto = _authService.Login(loginDto);
            if (userJwtDto == null)
            {
                return Unauthorized("Email or password is incorrect");
            }
            return Ok(userJwtDto);
        }

    }


}
