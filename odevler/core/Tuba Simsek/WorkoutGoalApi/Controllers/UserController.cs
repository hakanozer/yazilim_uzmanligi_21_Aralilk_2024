using Microsoft.AspNetCore.Mvc;
using WorkoutGoalApi.Dto.UserDto;
using WorkoutGoalApi.Models;
using WorkoutGoalApi.Services;

namespace WorkoutGoalApi.Controllers
{
    [ApiController] // Bu attribute, bu sınıfın bir API denetleyicisi olduğunu belirtir yani HTTP isteklerini işleyebilir
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