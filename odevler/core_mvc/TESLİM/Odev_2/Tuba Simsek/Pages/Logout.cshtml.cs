using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MVC.Pages
{
    public class LogoutModel : PageModel
    {
        public async Task<IActionResult> OnGet()
        {
            // Cookie Authentication Logout
            await HttpContext.SignOutAsync();

            // Session temizleme
            HttpContext.Session.Clear();

            // Login sayfasına yönlendirme
            return RedirectToPage("/Index");
        }
    }
}
