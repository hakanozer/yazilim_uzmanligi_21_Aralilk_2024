using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
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
        //Get contact by id
        public async Task<Contact> GetContactByIdAsync(int id)
        {
            var contact = await _db.Contacts.FindAsync(id);
            if (contact != null)
            {
                return contact;
            }
            else
            {
                throw new KeyNotFoundException($"Contact with id {id} not found.");
            }
            //return await _db.Contacts.FirstOrDefaultAsync(c => c.Id == id);
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

        public async Task<Contact> UpdateContactAsync(Contact contact)
        {
            _db.Contacts.Update(contact);
            await _db.SaveChangesAsync();
            return contact;
        }
        
    }
}