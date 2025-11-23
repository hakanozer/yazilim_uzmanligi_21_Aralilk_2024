using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MVC.Models;
using MVC.Utils;

namespace MVC.Services
{

    public class ContactsService
    {
        private readonly ApplicationDbContext _db;

        public ContactsService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Contact> AddContact(Contact contact)
        {
            _db.Contacts.Add(contact);
            await  _db.SaveChangesAsync();
            return contact;
        }

        public async Task<List<Contact>> GetAllContactsAsync()
        {
            return await _db.Contacts.ToListAsync();
        }

        // delete contact by id
        public async Task<bool> DeleteContactAsync(int id)
        {
            var contact = await _db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }
            _db.Contacts.Remove(contact);
            await _db.SaveChangesAsync();
            return true;
        }
        
    }
}