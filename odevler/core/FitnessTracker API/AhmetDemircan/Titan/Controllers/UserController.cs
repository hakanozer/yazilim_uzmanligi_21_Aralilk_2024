using Microsoft.AspNetCore.Mvc;
using Titan.Dto.UserDto;
using Titan.Models;
using Titan.Services;

namespace Titan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Tags("1. User")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register(UserRegisterDto userRegisterDto)
        {
            var user = _userService.Register(userRegisterDto);
            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginDto userLoginDto)
        {
            var userJwtDto = _userService.Login(userLoginDto);
            if (userJwtDto == null)
            {
                return Unauthorized("Email or password is incorrect");
            }
            return Ok(userJwtDto);
        }

    }


}