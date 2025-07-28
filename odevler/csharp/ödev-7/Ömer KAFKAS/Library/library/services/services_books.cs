using System.Data;
using Microsoft.Data.SqlClient;
using library.utils;
using library.Models;
using System.IO.Pipelines;


namespace library.services
{
    public class services_books
    {
        readonly DB _dB;

        public services_books()
        {
            _dB = new DB();
        }

        // Kitap ekleme
        public int AddBook(Books book)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO books writers_id,title, publication_year, ISBN VALUES (@writers_id, @title, @publication_year, @ISBN); SELECT SCOPE IDENTITY;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                
                command.Parameters.AddWithValue("@writers_id", book.Writers_ID);
                command.Parameters.AddWithValue("@title", book.Title);
                command.Parameters.AddWithValue("@publication_year", book.Publication_Year);
                command.Parameters.AddWithValue("@ISBN", book.ISBN);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return result;
        }

        // Kitap güncelleme
        public int UpdateBook(Books book)
        {
            int result = 0;
            try
            {
                {
                    string query = "UPDATE books SET SET title = @title, publication_year = @publicationpublication_year, ISBN = @ISBN; WHERE books_id = @books_id AND writers_id = @writers_id";
                    SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                    {
                        command.Parameters.AddWithValue("@books_id", book.Books_ID);
                        command.Parameters.AddWithValue("@writers_id", book.Writers_ID);
                        command.Parameters.AddWithValue("@title", book.Title);
                        command.Parameters.AddWithValue("@publication_year", book.Publication_Year);
                        command.Parameters.AddWithValue("@ISBN", book.ISBN);

                        result = command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return result;
        }

        // Kitap silme
        public int DeleteBook(int bookId)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM books WHERE books_id = @books_id;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@books_id", bookId);
                result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return result;
        }

        // Kitap listeleme
        public List<Books> listBooks()
        {
            List<Books> books = new List<Books>();
            try
            {
                string query = "SELECT * FROM Books";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Books book = new Books();
                    book.Books_ID = Convert.ToInt32(reader["books_id"]);
                    book.Writers_ID = Convert.ToInt32(reader["writers_id"]);
                    book.Title = reader["title"]?.ToString() ?? string.Empty;
                    book.Publication_Year = Convert.ToInt32(reader["publication_year"]);
                    book.ISBN = reader["ISBN"]?.ToString() ?? string.Empty;
                    books.Add(book);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return books;
        }       
    }
}