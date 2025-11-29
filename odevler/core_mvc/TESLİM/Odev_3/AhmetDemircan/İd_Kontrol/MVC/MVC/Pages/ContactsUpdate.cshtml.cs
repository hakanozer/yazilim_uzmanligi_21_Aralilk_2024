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

        public async Task<IActionResult> OnGet(int id)
        {
            var userId = User.FindFirst("UserId")?.Value;
            var intUserId = int.Parse(userId ?? "0");

            var contact = await _contactsService.GetContactByIdAsync(id);
            
            if (contact == null)
            {
                return NotFound();
            }

            if (contact.UserId != intUserId)
            {
                return StatusCode(403);
            }

            Contacts = contact;
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var userId = User.FindFirst("UserId")?.Value;
            var intUserId = int.Parse(userId ?? "0");

            // Security check: Ensure the contact belongs to the current user
            var originalContact = await _contactsService.GetContactByIdAsync(Contacts.Id);
            
            if (originalContact == null)
            {
                return NotFound();
            }

            if (originalContact.UserId != intUserId)
            {
                return StatusCode(403);
            }

            // Preserve the UserId
            Contacts.UserId = intUserId;

            await _contactsService.UpdateContactAsync(Contacts);
            return RedirectToPage("/Dashboard");
        }
    }
}
