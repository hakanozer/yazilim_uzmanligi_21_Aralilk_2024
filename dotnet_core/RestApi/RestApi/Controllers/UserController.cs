using Microsoft.AspNetCore.Mvc;
using RestApi.Models;
using RestApi.Services;

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
        public IActionResult Register(User user)
        {
            _userService.Register(user);
            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            return Ok("Login Success");
        }

    }


}