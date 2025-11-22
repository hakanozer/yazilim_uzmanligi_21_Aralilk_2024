using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MVC.Pages
{
  
    public class LogoutModel : PageModel
    {
       
        public async Task<IActionResult> OnGet() 
        {
            
            await HttpContext.SignOutAsync();// Login'de kullandığınız HttpContext.SignInAsync işlemini tersine çevirir.

            HttpContext.Session.Clear();//Oturum (Session) verilerini temizliyoruz.

           
            return RedirectToPage("/Index"); // Kullanıcıyı, oturum kapandıktan sonra Login'e yönlendiriyoruz.
        }

    }
}