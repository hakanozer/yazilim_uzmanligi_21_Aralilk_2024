using System;
using Microsoft.Data.SqlClient;
using LibraryManagementSystem.Models;
namespace LibraryManagementSystem.Services
{
    public class BorrowedService
    {
        readonly DB _dB;
        public BorrowedService()
        {
            _dB = new DB();
        }
        public int AddBorrowed(Borrowed borrowed)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO BorrowedItems (bid, mid, bdate) VALUES (@bid, @mid, @bdate)";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@bid", borrowed.BookId);
                command.Parameters.AddWithValue("@mid", borrowed.MemberId);
                command.Parameters.AddWithValue("@bdate", borrowed.BorrowDate);



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
        public int UpdateBorrowed(Borrowed borrowed)
        {
            int result = 0;
            try
            {
                string query = "UPDATE BorrowedItems SET gdate = @gdate WHERE boid = @boid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@gdate", borrowed.ReturnDate);
                command.Parameters.AddWithValue("@boid", borrowed.Id);

               
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
        public List<Borrowed> GetBorrowed()
        {
            List<Borrowed> borroweds = new List<Borrowed>();
            try
            {
                string query = "SELECT * FROM BorrowedItems";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    int id = reader.GetInt32(0);
                    int bookId = reader.GetInt32(1);
                    int memberId = reader.GetInt32(2);
                    DateTime borrowDate = reader.GetDateTime(3);
                    DateTime? returnDate = reader.IsDBNull(4) ? (DateTime?)null : reader.GetDateTime(4);

                    Borrowed borrowed = new Borrowed(id, bookId, memberId, borrowDate, returnDate);
                    borroweds.Add(borrowed);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return borroweds;
        }
        public List<OduncSayisi> OduncSayisi()
        {
            List<OduncSayisi> borrowedCounts = new List<OduncSayisi>();
            try
            {
                string query = "SELECT * FROM odunc_sayisi";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string bookName = reader.GetString(0);
                    int borrowedCount = reader.GetInt32(1);

                    OduncSayisi borrowedCountItem = new OduncSayisi(bookName, borrowedCount);
                    borrowedCounts.Add(borrowedCountItem);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return borrowedCounts;
        }
        public List<iadeolmayanlar> IadeOlmayanlar()
        {
            List<iadeolmayanlar> notReturnedBooks = new List<iadeolmayanlar>();
            try
            {
                string query = "EXEC iade_olmayanlar";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string bookName = reader.GetString(0);

                    iadeolmayanlar notReturnedBook = new iadeolmayanlar(bookName);
                    notReturnedBooks.Add(notReturnedBook);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return notReturnedBooks;
        }

    }

}
