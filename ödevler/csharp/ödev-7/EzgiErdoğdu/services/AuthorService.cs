using System.Data;
using Microsoft.Data.SqlClient;
using LibraryManagementSystem.Models;


namespace LibraryManagementSystem.Services
{
    public class AuthorService
    {
        readonly DB _dB;
        public AuthorService()
        {
            _dB = new DB();
        }
        public int AddAuthors(Author author)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Authors (name, surname) VALUES (@name, @surname)";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@name", author.Name);
                command.Parameters.AddWithValue("@surname", author.Surname);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return result;
        }

        public int UpdateAuthor(Author author)
        {
            int result = 0;

            try
            {
                string query = "UPDATE Authors SET name = @name, surname = @surname WHERE aid = @aid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());

                command.Parameters.AddWithValue("@name", author.Name);
                command.Parameters.AddWithValue("@surname", author.Surname);
                command.Parameters.AddWithValue("@aid", author.Aid);

                result = command.ExecuteNonQuery();
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }

            return result;
        }

        public List<Author> GetAuthors()
        {
            List<Author> authors = new List<Author>();

            try
            {
                string query = "SELECT * FROM Authors";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    int aid = reader.GetInt32(0);
                    string name = reader.GetString(1);
                    string surname = reader.GetString(2);

                    Author author = new Author(aid, name, surname);
                    authors.Add(author);
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }

            return authors;
        }
        public int DeleteAuthor(int aid)
        {
            int result = 0;

            try
            {
                string query = "DELETE FROM Authors WHERE aid = @aid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@aid", aid);

                result = command.ExecuteNonQuery();
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }

            return result;
        }

    }

}