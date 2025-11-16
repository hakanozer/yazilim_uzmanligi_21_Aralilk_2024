using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Services;

namespace MVC.Pages
{
    public class IndexModel : PageModel
    {

        [BindProperty]
        public string Username { get; set; } = string.Empty;

        [BindProperty]
         public string Password { get; set; } = string.Empty;

        private readonly UserService _userService;
         public IndexModel(UserService userService)
        {
            _userService = userService;
        }

        public void OnGet()
        {
            Console.WriteLine("Razor Pages Login GET");
        }

        public IActionResult OnPost()
        {
            _userService.UserLogin(Username, Password);
            return Page();
        }

    }
}
