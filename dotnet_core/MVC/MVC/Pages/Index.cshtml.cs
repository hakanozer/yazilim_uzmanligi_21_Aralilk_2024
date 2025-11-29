using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Services;

namespace MVC.Pages
{
    public class IndexModel : PageModel
    {

        [BindProperty]
        public string Email { get; set; } = string.Empty;

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

        public async Task<IActionResult> OnPost()
        {
            var user = _userService.UserLogin(Email, Password);
            if (user != null) {
                var fullName = $"{user.FirstName} {user.LastName}";
                var claims = new List<Claim>
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, fullName),
                    new Claim(ClaimTypes.Role, user.Role)
                };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                
                HttpContext.Session.SetString("Email", user.Email);
                HttpContext.Session.SetString("Role", user.Role);

                return RedirectToPage("/Dashboard");
            } else {
                ModelState.AddModelError(string.Empty, "E-mail or Password is incorrect.");
                return Page();
            }
        }

        // /Index?handler=Logout
        public async Task<IActionResult> OnGetLogout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Clear();
            return RedirectToPage("/Index"); 
        }

    }
}
