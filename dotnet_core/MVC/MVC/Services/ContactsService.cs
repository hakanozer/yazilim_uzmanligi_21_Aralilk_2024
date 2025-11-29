using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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

        public async Task<List<Contact>> GetAllContactsAsync(int intUserId)
        {
            return await _db.Contacts.Where(c => c.UserId == intUserId).ToListAsync();
        }

        // delete contact by id
        public async Task<bool> DeleteContactAsync(int id, int intUserId)
        {
            var contact = await _db.Contacts.Where(c => c.Id == id && c.UserId == intUserId).FirstOrDefaultAsync();
            if (contact == null)
            {
                return false;
            }
            _db.Contacts.Remove(contact);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<Contact?> GetContactByIdAsync(int id, int intUserId)
        {
            return await _db.Contacts.Where(c => c.Id == id && c.UserId == intUserId).FirstOrDefaultAsync();
        }

        // UpdateContactAsync params Contact contact
        public async Task<bool> UpdateContactAsync(Contact contact)
        {
            var existingContact = await _db.Contacts.Where(c => c.Id == contact.Id && c.UserId == contact.UserId).FirstOrDefaultAsync();
            if (existingContact == null)
            {
                return false;
            }
            existingContact.Name = contact.Name;
            existingContact.Email = contact.Email;
            existingContact.Phone = contact.Phone;
            existingContact.Company = contact.Company;
            _db.Contacts.Update(existingContact);
            await _db.SaveChangesAsync();
            return true;
        }
        
    }
}