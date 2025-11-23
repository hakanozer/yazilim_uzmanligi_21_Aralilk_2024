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

        public void OnGet(int id)
        {
            Console.WriteLine($"Contact ID to update: {id}");           
        }
    }
}
