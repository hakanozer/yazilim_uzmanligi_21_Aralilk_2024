using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Models;
using MVC.Services;

namespace MVC.Pages
{
    public class ContactsUpdateModel : PageModel
    {

        [BindProperty]
        public Contact Contacts { get; set; } = new();

        private readonly ContactsService _contactsService;
        public ContactsUpdateModel(ContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        public async Task OnGet(int id)
        {
            var userId = User.FindFirst("UserId")?.Value;
            var intUserId = int.Parse(userId ?? "0");
            var contact = await _contactsService.GetContactByIdAsync(id, intUserId);
            if (contact != null)
            {
                Contacts = contact;
            }
            else
            {
                Response.Redirect("/Dashboard");
            }
        }

        // Post method to update contact
        public async Task<IActionResult> OnPostSingleContactUpdate(int id)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            Contacts.Id = id;
            var userId = User.FindFirst("UserId")?.Value;
            var intUserId = int.Parse(userId ?? "0");
            Contacts.UserId = intUserId;
            await _contactsService.UpdateContactAsync(Contacts);
            return RedirectToPage("/Dashboard");
        }
    }
}
