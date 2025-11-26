using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;
using MVC.Models;
using MVC.Services;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MVC.Pages
{
    [Authorize(Roles = "User")]
    public class ContactsUpdateModel : PageModel
    {

        [BindProperty]
        public Contact Contacts { get; set; } = new();

        private readonly ContactsService _contactsService;
        public ContactsUpdateModel(ContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            Console.WriteLine($"Contact ID to update: {id}");
            try
            {
                Contacts = await _contactsService.GetContactByIdAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            if (Contacts != null)
            {
                Console.WriteLine($"Contact found: {Contacts.Name}, {Contacts.Email}, {Contacts.Phone}");
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine($"Contact data is invalid: {Contacts.Name}, {Contacts.Email}, {Contacts.Phone}");
                Console.WriteLine("Model state is invalid.");
                return Page();
            }

            await _contactsService.UpdateContactAsync(Contacts);

            return RedirectToPage("/Dashboard");
        }
    }
}
