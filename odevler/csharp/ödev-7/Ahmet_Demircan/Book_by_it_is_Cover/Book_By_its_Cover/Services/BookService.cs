using System.Data;
using Microsoft.Data.SqlClient;
using Book_By_its_Cover.Models;
using Book_By_its_Cover.Utils;
using Book_By_its_Cover.Utils.DBC;

namespace Book_By_its_Cover.Services
{
    public class BookService
    {
        private readonly DBC _dbc;

        public BookService()
        {
            _dbc = new DBC();
        }

        public List<Author> GetAllAuthors(string? filter = null)
        {
            List<Author> authors = new List<Author>();
            try
            {
                string query = "SELECT * FROM Author";
                if (!string.IsNullOrEmpty(filter))
                {
                    query += " WHERE AuthorFullName LIKE @Filter";
                }
        
                using var command = new SqlCommand(query, _dbc.GetConnection());
                if (!string.IsNullOrEmpty(filter))
                {
                    command.Parameters.AddWithValue("@Filter", $"%{filter}%");
                }
        
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Author author = new Author
                    {
                        AuthorID = Convert.ToInt32(reader["AuthorID"]),
                        AuthorFullName = reader["AuthorFullName"].ToString()
                    };
                    authors.Add(author);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return authors;
        }

        public int AddAuthor(Author author)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Author (AuthorFullName) VALUES (@AuthorFullName)";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@AuthorFullName", author.AuthorFullName);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }

        public List<Books> vw_BooksWithAuthors() {
            List<Books> contacts = new List<Books>();
            try 
            {
                string query = "SELECT * from vw_BooksWithAuthors";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Books books = new Books();
                    books.BookID = Convert.ToInt32(reader["BookID"]);
                    books.B_Name = reader["B_Name"].ToString();
                    books.AuthorFullName = reader["AuthorFullName"].ToString();
                    books.ISBN = Convert.ToInt32(reader["ISBN"]);
                    books.publishTime = Convert.ToInt32(reader["publishTime"]);
                    contacts.Add(books);
                }
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return contacts;
        }

        public int AddBook(Books book)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Books (B_Name, AuthorID, ISBN, publishTime) VALUES (@B_Name, @AuthorID, @ISBN, @publishTime)";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@B_Name", book.B_Name);
                command.Parameters.AddWithValue("@AuthorID",book.AuthorID);
                command.Parameters.AddWithValue("@ISBN", book.ISBN);
                command.Parameters.AddWithValue("@publishTime", book.publishTime);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }

        public int DeleteBook(int bookID)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Books WHERE BookID = @BookID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@BookID", bookID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }

        public int UpdateBook(Books book)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Books SET B_Name = @B_Name, AuthorID = @AuthorID, ISBN = @ISBN, publishTime = @publishTime WHERE BookID = @BookID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@B_Name", book.B_Name);
                command.Parameters.AddWithValue("@AuthorID", book.AuthorID);
                command.Parameters.AddWithValue("@ISBN", book.ISBN);
                command.Parameters.AddWithValue("@publishTime", book.publishTime);
                command.Parameters.AddWithValue("@BookID", book.BookID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }

        public int AddCustomer (Customer costumer)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Customer (CustomerFullName, CMail, CPhone) VALUES (@CustomerFullName, @CMail, @CPhone)";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@CustomerFullName", costumer.CustomerFullName);
                command.Parameters.AddWithValue("@CMail", costumer.CMail);
                command.Parameters.AddWithValue("@CPhone", costumer.CPhone);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        public List<Customer> GetCustomers(string? filter = null) //listing and search
        {
            var customers = new List<Customer>();
            try
            {
                string query = "SELECT * FROM Customer";
                if (!string.IsNullOrEmpty(filter))
                {
                    query += " WHERE CustomerFullName LIKE @Filter";
                }
        
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                if (!string.IsNullOrEmpty(filter))
                {
                    command.Parameters.AddWithValue("@Filter", $"%{filter}%");
                }
        
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var customer = new Customer
                    {
                        CustomerID = Convert.ToInt32(reader["CustomerID"]),
                        CustomerFullName = reader["CustomerFullName"].ToString(),
                        CMail = reader["CMail"]?.ToString() ?? string.Empty,
                        CPhone = reader["CPhone"]?.ToString() ?? string.Empty,
                    };
                    customers.Add(customer);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return customers;
        }
        public int DeleteCustomer(int customerID)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Customer WHERE CustomerID = @CustomerID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@CustomerID", customerID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        public int UpdateCustomer(Customer customer)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Customer SET CustomerFullName = @CustomerFullName, CMail = @CMail, CPhone = @CPhone WHERE CustomerID = @CustomerID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@CustomerFullName", customer.CustomerFullName);
                command.Parameters.AddWithValue("@CMail", customer.CMail);
                command.Parameters.AddWithValue("@CPhone", customer.CPhone);
                command.Parameters.AddWithValue("@CustomerID", customer.CustomerID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        public int DeleteAuthor(int authorID)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Author WHERE AuthorID = @AuthorID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@AuthorID", authorID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        public List<Loan> GetLoans(string? filter = null)
        {
            var loans = new List<Loan>();
            try
            {
                string query = "SELECT * FROM Customer_Loans";
                if (!string.IsNullOrEmpty(filter))
                {
                    query += " WHERE CustomerID LIKE @Filter";
                }
        
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                if (!string.IsNullOrEmpty(filter))
                {
                    command.Parameters.AddWithValue("@Filter", $"%{filter}%");
                }
        
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var loan = new Loan
                    {
                        LoanID = Convert.ToInt32(reader["LoanID"]),
                        BookID = Convert.ToInt32(reader["BookID"]),
                        CostumerID = Convert.ToInt32(reader["CustomerID"]),
                        CustomerFullName = reader["CustomerFullName"].ToString(),
                        B_Name = reader["B_Name"].ToString(),
                        LoanDate = reader["LoanDate"] != DBNull.Value ? Convert.ToInt32(reader["LoanDate"]) : (int?)null,
                        ReturnDate = reader["ReturnDate"] != DBNull.Value ? Convert.ToInt32(reader["ReturnDate"]) : (int?)null,
                        IsReturned = reader["IsReturned"] is byte byteValue && byteValue == 1
                    };
                    loans.Add(loan);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return loans;
        }
        public int AddLoan(Loan loan)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Loan (CostumerID, BookID, LoanDate, ReturnDate, IsReturned) VALUES (@CostumerID, @BookID, @LoanDate, @ReturnDate, @IsReturned)";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@CostumerID", loan.CostumerID);
                command.Parameters.AddWithValue("@BookID", loan.BookID);
                command.Parameters.AddWithValue("@LoanDate", loan.LoanDate);
                command.Parameters.AddWithValue("@ReturnDate", loan.ReturnDate ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@IsReturned", loan.IsReturned);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        public int DeleteLoan(int loanID)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Loan WHERE LoanID = @LoanID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@LoanID", loanID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        public int UpdateLoan(Loan loan)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Loan SET CostumerID = @CostumerID, BookID = @BookID, LoanDate = @LoanDate, ReturnDate = @ReturnDate, IsReturned = @IsReturned WHERE LoanID = @LoanID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@CostumerID", loan.CostumerID);
                command.Parameters.AddWithValue("@BookID", loan.BookID);
                command.Parameters.AddWithValue("@LoanDate", loan.LoanDate);
                command.Parameters.AddWithValue("@ReturnDate", loan.ReturnDate);
                command.Parameters.AddWithValue("@IsReturned", loan.IsReturned);
                command.Parameters.AddWithValue("@LoanID", loan.LoanID);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return result;
        }
        /*public List<Loan> GetLoansByCustomerID(int customerID)
        {
            var loans = new List<Loan>();
            try
            {
                string query = "SELECT * FROM Customer_Loans WHERE CostumerID = @CostumerID";
                SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
                command.Parameters.AddWithValue("@CostumerID", customerID);
        
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var loan = new Loan
                    {
                        LoanID = Convert.ToInt32(reader["LoanID"]),
                        BookID = Convert.ToInt32(reader["BookID"]),
                        CostumerID = Convert.ToInt32(reader["CostumerID"]),
                        LoanDate = reader["LoanDate"] != DBNull.Value ? Convert.ToInt32(reader["LoanDate"]) : (int?)null,
                        ReturnDate = reader["ReturnDate"] != DBNull.Value ? Convert.ToInt32(reader["ReturnDate"]) : (int?)null,
                        IsReturned = reader["IsReturned"] is byte byteValue && byteValue == 1
                    };
                    loans.Add(loan);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return loans;
        }*/
        public List<Loan> GetLoansByCustomerID(int customerID)
        {
            var loans = new List<Loan>();
            try
            {
            string query = "SELECT * FROM Customer_Loans WHERE CustomerID = @CustomerID";
            SqlCommand command = new SqlCommand(query, _dbc.GetConnection());
            command.Parameters.AddWithValue("@customerID", customerID);
        
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                var loan = new Loan
                {
                LoanID = Convert.ToInt32(reader["LoanID"]),
                BookID = Convert.ToInt32(reader["BookID"]),
                CostumerID = Convert.ToInt32(reader["CustomerID"]),
                LoanDate = reader["LoanDate"] != DBNull.Value ? Convert.ToInt32(reader["LoanDate"]) : (int?)null,
                ReturnDate = reader["ReturnDate"] != DBNull.Value ? Convert.ToInt32(reader["ReturnDate"]) : (int?)null,
                CustomerFullName = reader["CustomerFullName"].ToString(),
                B_Name = reader["B_Name"].ToString(),
                };
                loans.Add(loan);
            }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dbc.CloseConnection();
            }
            return loans;
        }
    }
}