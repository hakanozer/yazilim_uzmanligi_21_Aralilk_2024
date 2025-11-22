using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace MVC.Pages
{
    [Authorize(Roles = "User")]
    public class DashboardModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
