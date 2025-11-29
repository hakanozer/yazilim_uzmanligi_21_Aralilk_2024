using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using MVC.Models;
using MVC.Services;
using System.Threading.Tasks;

namespace MVC.Pages
{
    [Authorize(Roles = "User")]
    public class DashboardModel : PageModel
    {
        [BindProperty]
        public Contact Contacts { get; set; } = new();

        private readonly ContactsService _contactsService;

        public DashboardModel(ContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        public List<Contact> ContactsList { get; set; } = new();

        public async Task OnGetAsync()
        {
            ContactsList = await _contactsService.GetAllContactsAsync();
        }

        public async Task<IActionResult> OnPostContactsAdd()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            await _contactsService.AddContact(Contacts);
            return RedirectToPage("/Dashboard");       
        }

        public async Task<IActionResult> OnGetContactsDelete(int id)
        {
            await _contactsService.DeleteContactAsync(id);
            return RedirectToPage("/Dashboard");
        }
        
    }
}
