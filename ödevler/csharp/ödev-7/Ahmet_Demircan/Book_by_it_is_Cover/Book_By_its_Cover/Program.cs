using System;
using Microsoft.Data.SqlClient;
using Book_By_its_Cover.Utils.DBC;
using Book_By_its_Cover.Services;
using Book_By_its_Cover.Models;

namespace Book_By_its_Cover
{
    class Program
    {
        static void Main(string[] args)
        {
            BookService bookService = new BookService();

            while(true)
            {
            // kontrol sistemi.
            Console.WriteLine("\n---Controls--- \n Exit press 'q'\n ---Books--- \n list book 'lsb'\n Add book: 'ab' \n delete book press 'db'\n update book 'ub'\n ---Authors--- \n list authors 'lsa'\n search for authors 'sa' \n Add author 'aa'\n Delete author 'da'\n ---Customer--- \n Add Customer 'ac'\n view customer 'lsc' \n search custumers 'sc'\n delete customer 'dc'\n Wiew Customer loans 'lscl'\n Add loan 'al'\n update loan 'ul' \n Search loan 'sl'\n dlete loan 'dl'");
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
            string input = Console.ReadLine();
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
            if (input == "q")
            {
                return;
            }else if (input == "db")
            {
                Console.WriteLine("Enter the BookID to delete: ");
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                string bookID = Console.ReadLine();
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
                int bookID_int = Convert.ToInt32(bookID);
                int deleteResult = bookService.DeleteBook(bookID_int);
                if (deleteResult > 0)
                {
                    Console.WriteLine("Book deleted successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to delete book.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }else if (input == "lsb") // list books
            {
                List<Books> books = bookService.vw_BooksWithAuthors();
                foreach (var b in books)
                {
                    Console.WriteLine($"BookID: {b.BookID}, BookName: {b.B_Name}, AuthorFullName: {b.AuthorFullName}, ISBN: {b.ISBN}, publishTime: {b.publishTime}");
                }
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }else if (input == "lsa") // list authors
            {
                List<Author> authors = bookService.GetAllAuthors();
                foreach (var a in authors)
                {
                    Console.WriteLine($"AuthorID: {a.AuthorID}, AuthorFullName: {a.AuthorFullName}");
                }
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }else if (input == "ub") // book update
            {
                List<Author> authors = bookService.GetAllAuthors();
                foreach (var author in authors)
                {
                    Console.WriteLine($"AuthorID: {author.AuthorID}, AuthorFullName: {author.AuthorFullName}");
                }
                foreach (var a in authors)
                {
                    Console.WriteLine($"AuthorID: {a.AuthorID}, AuthorFullName: {a.AuthorFullName}");
                    Console.WriteLine("---------Authors---------");
                }
                Console.WriteLine("Enter the BookID to update: ");
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                string bookID = Console.ReadLine();
                int bookID_int = Convert.ToInt32(bookID);
                Console.WriteLine("Enter the new BookName: ");
                string newBookName = Console.ReadLine();
                Console.WriteLine("Enter the new AuthorID: ");
                string newAuthorID = Console.ReadLine();
                int newAuthorID_int = Convert.ToInt32(newAuthorID);
                Console.WriteLine("Enter the new ISBN: ");
                string newISBN = Console.ReadLine();
                int newISBN_int = Convert.ToInt32(newISBN);
                Console.WriteLine("Enter the new publishTime: ");
                string newPublishTime = Console.ReadLine();
                int newPublishTime_int = Convert.ToInt32(newPublishTime);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
                
                Books updatedBook = new Books()
                {
                    BookID = bookID_int,
                    B_Name = newBookName,
                    AuthorID = newAuthorID_int,
                    ISBN = newISBN_int,
                    publishTime = newPublishTime_int
                };
                
                int updateResult = bookService.UpdateBook(updatedBook);
                if (updateResult > 0)
                {           
                    Console.WriteLine("Book updated successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to update book.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }else if (input == "sa") // search authors
            {
                Console.WriteLine("Enter the author name to search: ");
                string filter = Console.ReadLine()?? string.Empty;
                List<Author> authors = bookService.GetAllAuthors(filter);
                foreach (var author in authors)
                {
                    Console.WriteLine($"AuthorID: {author.AuthorID}, AuthorFullName: {author.AuthorFullName}");
                }
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }else if (input == "ac") // Customer add
            {
                Console.WriteLine("Enter the CustomerFullName: ");
                string customerFullName = Console.ReadLine()?? string.Empty;
                Console.WriteLine("Mail: ");
                string cMail = Console.ReadLine()?? string.Empty;
                Console.WriteLine("Phone: ");
                string cPhone = Console.ReadLine()?? string.Empty;
                
                Customer newCustomer = new Customer()
                {
                    CustomerFullName = customerFullName,
                    CMail = cMail,
                    CPhone = cPhone
                };
                
                int addCustomerResult = bookService.AddCustomer(newCustomer);
                if (addCustomerResult > 0)
                {           
                    Console.WriteLine("Customer added successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to add customer.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }
            else if (input == "sl") // search loan by customer name
            {
                Console.WriteLine("Enter the Customer Name to search loans: ");
                string name = Console.ReadLine() ?? string.Empty;
                List<Customer> customers = bookService.GetCustomers(name);
                {
                    List<int> customerIDs = new List<int>();
                    foreach (var customer in customers)
                    {
                        customerIDs.Add(customer.CustomerID);
                        Console.WriteLine($"Searching for: {customer.CustomerFullName} id: {customer.CustomerID}");
                    }
                    foreach (var customerID in customerIDs)
                    {
                        List<Loan> loans = bookService.GetLoansByCustomerID(customerID);
                        foreach (var loan in loans)
                        {
                            Console.WriteLine("-------------------------------------------------");
                            Console.WriteLine($"Full Name: {loan.CustomerFullName}, Book Name: {loan.B_Name}, Loan Date: {loan.LoanDate} Return Date: {loan.ReturnDate} , LoanID: {loan.LoanID}, CustomerID: {loan.CostumerID}, BookID: {loan.BookID}");
                        }
                    }
                }
            }
            else if (input == "lsc") // Customer list
            {
                List<Customer> customers = bookService.GetCustomers("");
                foreach (var customer in customers)
                {
                    Console.WriteLine($"CustomerID: {customer.CustomerID}, CustomerFullName: {customer.CustomerFullName}, Mail: {customer.CMail}, Phone: {customer.CPhone}");
                }
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }else if (input == "sc") // Customer search
            {
                Console.WriteLine("Enter the customer name to search: ");
                string filter = Console.ReadLine()?? string.Empty;
                List<Customer> customers = bookService.GetCustomers(filter);
                foreach (var customer in customers)
                {
                    Console.WriteLine($"CustomerID: {customer.CustomerID}, CustomerFullName: {customer.CustomerFullName}, Mail: {customer.CMail}, Phone: {customer.CPhone}");
                }
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }else if (input == "dc") // Customer delete
            {
                Console.WriteLine("Enter the CustomerID to delete: ");
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                string customerID = Console.ReadLine();
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
                if (string.IsNullOrEmpty(customerID))
                {
                    Console.WriteLine("Canceled the delete operation.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                int customerID_int = Convert.ToInt32(customerID);
                int deleteCustomerResult = bookService.DeleteCustomer(customerID_int);
                if (deleteCustomerResult > 0)
                {
                    Console.WriteLine("Customer deleted successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to delete customer.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }else if (input == "aa") // add Author
            {
                Console.WriteLine("Enter the Author FullName: ");
                string AuthorFullName = Console.ReadLine()?? string.Empty;

                Author author = new Author()
                {
                    AuthorFullName = AuthorFullName
                };
                int addAuthorResult = bookService.AddAuthor(author);
                if (addAuthorResult > 0)
                {
                    Console.WriteLine("Author added successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to add author.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                
            }else if (input == "da") // delete Author
            {
                Console.WriteLine("Warning in order to delete author you must delete all books that are written by this author.");
                Console.WriteLine("If you want to continue press with deleting books'y' else press any key: ");
                if (Console.ReadLine() == "y")
                {
                    Console.WriteLine("The delete operatio stoped please use 'db' to delete books first.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                Console.WriteLine("Enter the AuthorID to delete: ");
                string authorID = Console.ReadLine()?? string.Empty;
                try
                {
                    int authorID_int = Convert.ToInt32(authorID);
                    int deleteAuthorResult = bookService.DeleteAuthor(authorID_int);
                    if (deleteAuthorResult > 0)
                    {
                    Console.WriteLine("Author deleted successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                    }
                    else
                    {
                    Console.WriteLine("Failed to delete author.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invalid AuthorID format. Please enter a valid number.");
                }
            }
            }
            else if (input == "lscl") // Customer loans
            {
                List<Loan> loans = bookService.GetLoans();
                foreach (var loan in loans)
                {
                    Console.WriteLine($"Full Name: {loan.CustomerFullName}, Book Name: {loan.B_Name}, Loan Date: {loan.LoanDate} Return Date: {loan.ReturnDate} , LoanID: {loan.LoanID}, CustomerID: {loan.CostumerID}, BookID: {loan.BookID}");
                }
                Console.WriteLine("If you want to leave press 'q': ");
                input = Console.ReadLine()?? string.Empty;
                if (input == "q")
                {
                    return;
                }             
            }else if (input == "ul") // update loan
            {
                Console.WriteLine("Enter the LoanID to update: ");
                string loanID = Console.ReadLine()?? string.Empty;
                int loanID_int = Convert.ToInt32(loanID);
                Console.WriteLine("Enter the new CustomerID: ");
                string customerID = Console.ReadLine()?? string.Empty;
                int customerID_int = Convert.ToInt32(customerID);
                Console.WriteLine("Enter the new BookID: ");
                string bookID = Console.ReadLine()?? string.Empty;
                int bookID_int = Convert.ToInt32(bookID);
                Console.WriteLine("Enter the new LoanDate: ");
                string newLoanDate = Console.ReadLine()?? string.Empty;
                Console.WriteLine("Enter the new ReturnDate: ");
                string newReturnDate = Console.ReadLine()?? string.Empty;
                Loan updatedLoan = new Loan()
                {
                    LoanID = loanID_int,
                    LoanDate = string.IsNullOrEmpty(newLoanDate) ? (int?)null : Convert.ToInt32(newLoanDate),
                    ReturnDate = string.IsNullOrEmpty(newReturnDate) ? (int?)null : Convert.ToInt32(newReturnDate),
                    CostumerID = customerID_int,
                    BookID = bookID_int,
                };
                int updateLoanResult = bookService.UpdateLoan(updatedLoan);
                if (updateLoanResult > 0)
                {           
                    Console.WriteLine("Loan updated successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to update loan.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }
            else if (input == "al") // Add loan
            {
                Console.WriteLine("Enter the CustomerID: ");
                string customerID = Console.ReadLine()?? string.Empty;
                int customerID_int = Convert.ToInt32(customerID);
                Console.WriteLine("Enter the BookID: ");
                string bookID = Console.ReadLine()?? string.Empty;
                int bookID_int = Convert.ToInt32(bookID);
                Console.WriteLine("Enter the LoanDate: ");
                string loanDate = Console.ReadLine()?? string.Empty;
                Console.WriteLine("Enter the ReturnDate: ");
                string returnDate = Console.ReadLine()?? string.Empty;
                
                Loan newLoan = new Loan()
                {
                    CostumerID = customerID_int,
                    BookID = bookID_int,
                    LoanDate = string.IsNullOrEmpty(loanDate) ? (int?)null : Convert.ToInt32(loanDate),
                    ReturnDate = string.IsNullOrEmpty(returnDate) ? (int?)null : Convert.ToInt32(returnDate),
                    IsReturned = false
                };
                
                int addLoanResult = bookService.AddLoan(newLoan);
                if (addLoanResult > 0)
                {           
                    Console.WriteLine("Loan added successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to add loan.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }
            else if (input == "dl") // delete loan
            {
                Console.WriteLine("Enter the LoanID to delete: ");
                string loanID = Console.ReadLine()?? string.Empty;
                int loanID_int = Convert.ToInt32(loanID);
                int deleteLoanResult = bookService.DeleteLoan(loanID_int);
                if (deleteLoanResult > 0)
                {
                    Console.WriteLine("Loan deleted successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine("Failed to delete loan.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
                }
            }
            else if (input == "ab")
            {
                Console.WriteLine("Continuing with the add book process.");
            //book input area
            Console.WriteLine ("Book Name: "); 
            string bookName = Console.ReadLine() ?? string.Empty;
            Console.WriteLine ("AuthorID");
            string AuthorID = Console.ReadLine()?? string.Empty;
            int author_int = Convert.ToInt32(AuthorID);
            Console.WriteLine ("ISBN: ");
            string ISBN = Console.ReadLine()?? string.Empty;
            int ISBN_int = Convert.ToInt32(ISBN);
            if (ISBN_int != 10)
            {
                Console.WriteLine("ISBN must be 10 digits long.");;
            }
             Console.WriteLine ("publishTime: ");
             string publishTime = Console.ReadLine()?? string.Empty;
             int publishTime_int = Convert.ToInt32(publishTime);
            
            // book create area
            Books book = new Books()
            {
                B_Name = bookName,
                AuthorID = author_int,
                ISBN = ISBN_int,
                publishTime = publishTime_int
            };
            int result = bookService.AddBook(book); 
            if (result > 0)
            {
                Console.WriteLine("Book added successfully.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }
            else
            {
                Console.WriteLine("Failed to add book.");
                    Console.WriteLine("If you want to leave press 'q': ");
                    input = Console.ReadLine()?? string.Empty;
                    if (input == "q")
                    {
                        return;
                    }
            }
            Console.WriteLine("------Add Book------");
            }
            }
        }
    }
}