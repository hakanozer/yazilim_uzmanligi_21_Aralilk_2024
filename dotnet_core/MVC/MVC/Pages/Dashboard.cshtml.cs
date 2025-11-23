using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using MVC.Models;

namespace MVC.Pages
{
    [Authorize(Roles = "User")]
    public class DashboardModel : PageModel
    {
        [BindProperty]
        public Contact Contacts { get; set; } = new();

        public IActionResult OnPostContactsAdd()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            return RedirectToPage("/Dashboard");       
        }
        
    }
}
