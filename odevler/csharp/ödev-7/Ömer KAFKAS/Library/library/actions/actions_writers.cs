using library.services;
using library.Models;

namespace Library.libraryActions
{
    public class ActionsWriters
    {
        services_writers _servicesWriters = new services_writers();

        public void WriterAdd()
        { 
            Console.WriteLine("Enter Writer Name:");
            string name = Console.ReadLine() ?? string.Empty;

            Console.WriteLine("Enter Writer Surname:");
            string surname = Console.ReadLine() ?? string.Empty;

            Writer writer = new Writer (0, name, surname);

            int result = _servicesWriters.AddWriter(writer);

            if (result > 0)
                Console.WriteLine("Writer added successfully.");
            else
                Console.WriteLine("Failed to add writer.");
        }
        public void WriterUpdate()
        {
            Console.WriteLine("Enter Writer ID to update:");
            int writerId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Writer Name:");
            string name = Console.ReadLine() ?? string.Empty;

            Console.WriteLine("Enter Writer Surname:");
            string surname = Console.ReadLine() ?? string.Empty;

            Writer writer = new Writer (writerId, name, surname);

            int result = _servicesWriters.UpdateWriter(writer);

            if (result > 0)
                Console.WriteLine("Writer updated successfully.");
            else
                Console.WriteLine("Failed to update writer.");
        }
        public void WriterDelete()
        {
            Console.WriteLine("Enter Writer ID to delete:");
            int writerId = Convert.ToInt32(Console.ReadLine());

            int result = _servicesWriters.DeleteWriter(writerId);

            if (result > 0)
                Console.WriteLine("Writer deleted successfully.");
            else
                Console.WriteLine("Failed to delete writer.");
        }
        public void WriterList()
        {
            List<Writer> writers = _servicesWriters.ListWriters();

            if (writers.Count > 0)
            {
                Console.WriteLine("Writers List:");
                foreach (var writer in writers)
                {
                    Console.WriteLine($"ID: {writer.WritersID}, Name: {writer.WritersName}, Surname: {writer.WritersSurname}");
                }
            }
            else
            {
                Console.WriteLine("No writers found.");
            }
        }
        public void WriterSearch()
        {
            List<Writer> writers = _servicesWriters.ListWriters();

            if (writers.Count > 0)
            {
                Console.WriteLine("Writers List:");
                foreach (var writer in writers)
                {
                    Console.WriteLine($"ID: {writer.WritersID}, Name: {writer.WritersName}, Surname: {writer.WritersSurname}");
                }
            }
            else
            {
                Console.WriteLine("No writers found.");
            }
        }
    }
            
}