using library.services;
using library.Models;


namespace library.actions
{
    
    public class ActionsBooks
    {
        services_books _servicesBooks = new services_books();
        
        public void BookAdd()
        {
            Console.WriteLine("Enter Book ID:");
            int bookId = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Writer ID:");
            int writerId = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Book Title:");
            string title = Console.ReadLine() ?? string.Empty;
            
            Console.WriteLine("Enter Publication Year:");
            int publicationYear = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter ISBN:");
            string isbn = Console.ReadLine() ?? string.Empty;
            
            Books book = new Books(bookId, writerId, title, publicationYear, isbn);
            
            int result = _servicesBooks.AddBook(book);
            
            if (result > 0)
                Console.WriteLine("Book added successfully.");
            else
                Console.WriteLine("Failed to add book.");
        }

        public void BookUpdate()
        {
            Console.WriteLine("Enter Book ID to update:");
            int bookId = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Writer ID:");
            int writerId = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Book Title:");
            string title = Console.ReadLine() ?? string.Empty;
            
            Console.WriteLine("Enter Publication Year:");
            int publicationYear = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter ISBN:");
            string isbn = Console.ReadLine() ?? string.Empty;
            
            Books book = new Books(bookId, writerId, title, publicationYear, isbn);
            
            int result = _servicesBooks.UpdateBook(book);
            
            if (result > 0)
                Console.WriteLine("Book updated successfully.");
            else
                Console.WriteLine("Failed to update book.");
        }

        public void BookDelete()
        {
            Console.WriteLine("Enter Book ID to delete:");
            int bookId = Convert.ToInt32(Console.ReadLine());
            
            int result = _servicesBooks.DeleteBook(bookId);
            
            if (result > 0)
                Console.WriteLine("Book deleted successfully.");
            else
                Console.WriteLine("Failed to delete book.");
        }
        public void BookList()
        {
            List<Books> books = _servicesBooks.listBooks();
            
            if (books.Count > 0)
            {
                Console.WriteLine("Books List:");
                foreach (var book in books)
                {
                    Console.WriteLine($"ID: {book.Books_ID}, Title: {book.Title}, Writer ID: {book.Writers_ID}, Publication Year: {book.Publication_Year}, ISBN: {book.ISBN}");
                }
            }
            else
            {
                Console.WriteLine("No books found.");
            }
        }
    }
}