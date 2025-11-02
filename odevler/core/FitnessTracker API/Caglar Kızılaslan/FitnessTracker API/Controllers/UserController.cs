using FitnessTracker_API.Dto.UserDto;
using FitnessTracker_API.Models;
using FitnessTracker_API.Services;
using FitnessTracker_API.UserDto;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase // miras alır
    {
        private readonly UserService _userService; //User servis bağlantısı
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
        [SwaggerOperation(
            Summary = "Kullanıcı girişi",
            Description = "Kullanıcı email ve şifre ile giriş yapar. Örnek: Email: veli@mail.com, Password: 123456"
        )]
        [ProducesResponseType(typeof(UserLoginSuccessDto), 200)]
        [ProducesResponseType(401)]
        public IActionResult Login(UserLoginDto userLoginDto)
        {
            var userLoginSuccessDto = _userService.Login(userLoginDto);
            if (userLoginSuccessDto == null)
            {
                return Unauthorized("Email or Password is incorrect!");
            }
            return Ok(userLoginSuccessDto);
        }
    }
}