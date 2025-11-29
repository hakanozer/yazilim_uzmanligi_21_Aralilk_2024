using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Dto.UserDto;
using MVC.Models;
using MVC.Services;

namespace MVC.Pages.Account
{
    public class RegisterModel : PageModel
    {
        [BindProperty]
        public UserRegisterDto UserRegisterDto { get; set; } = new();

        private readonly UserService _userService;
        public RegisterModel(UserService userService)
        {
            _userService = userService;
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            User user = _userService.UserRegister(UserRegisterDto);
            if (user != null)
            {
                return RedirectToPage("/Index");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Registration failed.");
                return Page();
            }
        }
    }
}
