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

        private readonly IndexService _indexService;
         public IndexModel(IndexService indexService)
        {
            _indexService = indexService;
        }

        public void OnGet()
        {
            //Console.WriteLine("Razor Pages Login GET");
        }

        public IActionResult OnPost()
        {
            _indexService.UserLogin(Email, Password);
            return Page();
        }

    }
}
