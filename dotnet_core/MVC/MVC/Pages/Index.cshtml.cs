using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MVC.Pages
{
    public class IndexModel : PageModel
    {

        [BindProperty]
        public string Username { get; set; } = string.Empty;

        [BindProperty]
         public string Password { get; set; } = string.Empty;

        public void OnGet()
        {
            Console.WriteLine("Razor Pages Login GET");
        }

        public IActionResult OnPost()
        {
            Console.WriteLine("Razor Pages Login POST");
            Console.WriteLine(Username);
            return Page();
        }

    }
}
