using System;
using Microsoft.Data.SqlClient; 
using LibraryManagementSystem.Models;
using Microsoft.Identity.Client;

public class BookService
{
    readonly DB _dB;
    public BookService()
    {
        _dB = new DB();
    }
    public int AddBook(Book book)
    {
        int result = 0;
        try
        {
            string query = "INSERT INTO Books (bookname, aid, year, isbn) VALUES (@bookname, @aid, @year, @isbn)";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());
            command.Parameters.AddWithValue("@bookname", book.bookname);
            command.Parameters.AddWithValue("@aid", book.aid);
            command.Parameters.AddWithValue("@year", book.year);
            command.Parameters.AddWithValue("@isbn", book.isbn);

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
    public List<Book> GetBooks()
    {
        List<Book> books = new List<Book>();
        try
        {
            string query = "SELECT * FROM Books";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Book book = new Book
                {
                    bid = reader.GetInt32(0),
                    bookname = reader.GetString(1),
                    aid = reader.GetInt32(2),
                    isbn = reader.GetString(3),
                    year = reader.GetDateTime(4)
                };
                books.Add(book);
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
        return books;
    }
    public int UpdateBook(Book book)
    {
        int result = 0;

        try
        {
            string query = "UPDATE Books SET bookname = @bookname, aid = @aid, year = @year, isbn = @isbn WHERE bid = @bid";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());

            command.Parameters.AddWithValue("@bookname", book.bookname);
            command.Parameters.AddWithValue("@aid", book.aid);
            command.Parameters.AddWithValue("@year", book.year);
            command.Parameters.AddWithValue("@isbn", book.isbn);
            command.Parameters.AddWithValue("@bid", book.bid);

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
    public int DeleteBook(int bid)
    {
        int result = 0;

        try
        {
            string query = "DELETE FROM Books WHERE bid = @bid";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());
            command.Parameters.AddWithValue("@bid", bid);

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