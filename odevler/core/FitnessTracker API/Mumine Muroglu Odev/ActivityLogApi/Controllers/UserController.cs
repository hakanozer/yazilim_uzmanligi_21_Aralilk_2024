using Microsoft.AspNetCore.Mvc;
using ActivityLogApi.Dto.UserDto;
using ActivityLogApi.Models;
using ActivityLogApi.Services;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


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
            var user =_userService.Register(userRegisterDto);
            return Ok(user);
            
        }


        [HttpPost("login")]
        public IActionResult Login(UserLoginDto userLoginDto)
        {
            var userJwtDto = _userService.Login(userLoginDto);
            if(userJwtDto == null)
            {
                return Unauthorized("Email or password is incorrect");
            }
            return Ok(userJwtDto); //Email ve password veritanında doğrulandıysa user nesnesini döndüryoruz.
        }
    }


}

// http://localhost:5185/api/user/login