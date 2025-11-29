using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using MVC.Models;
using MVC.Services;
using Ganss.Xss;

namespace MVC.Pages
{
    [Authorize(Roles = "User")]
    public class DashboardModel : PageModel
    {
        private readonly HtmlSanitizer _sanitizer = new();

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
            var userId = User.FindFirst("UserId")?.Value;
            var intUserId = int.Parse(userId ?? "0");
            ContactsList = await _contactsService.GetAllContactsAsync(intUserId);
        }

        public async Task<IActionResult> OnPostContactsAdd()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            Contacts.Name = _sanitizer.Sanitize(Contacts.Name);
            await _contactsService.AddContact(Contacts);
            return RedirectToPage("/Dashboard");       
        }

        public async Task<IActionResult> OnGetContactsDelete(int id)
        {
            var userId = User.FindFirst("UserId")?.Value;
            var intUserId = int.Parse(userId ?? "0");
            await _contactsService.DeleteContactAsync(id, intUserId);
            return RedirectToPage("/Dashboard");
        }
        
    }
}
