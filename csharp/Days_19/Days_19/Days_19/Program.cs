using Days_19;
using Days_19.Models;

namespace Days_19;
    class Program
{
    static void Main(string[] args)
    {
        Contact contact = new Contact(0, "x", "y", "x@mail.com", "76543223", "İzmir");
        ContactService contactService = new ContactService();
        int result = contactService.AddContact(contact);
        if (result > 0)
        {
            Console.WriteLine("Contact added successfully.");
        }
        else
        {
            Console.WriteLine("Failed to add contact.");
        }
}

}