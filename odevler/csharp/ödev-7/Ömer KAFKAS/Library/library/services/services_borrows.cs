using System.Data;
using Microsoft.Data.SqlClient;
using library.Models;
using library.utils;

namespace library.services
{
    public class services_borrows
    {
        readonly DB _dB;

        public services_borrows()
        {
            _dB = new DB();
        }

        // Ödünç ekleme
        public int AddBorrow(Borrows borrow)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO borrows (books_id, member_id, borrows_date, return_date) VALUES (@books_id, @member_id, @borrows_date, @return_date); SELECT SCOPE_IDENTITY();";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@books_id", borrow.BookId);
                command.Parameters.AddWithValue("@member_id", borrow.MemberId);
                command.Parameters.AddWithValue("@borrows_date", borrow.BorrowDate);
                command.Parameters.AddWithValue("@return_date", borrow.ReturnDate);

                result = Convert.ToInt32(command.ExecuteScalar());
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

        // Ödünç güncelleme
        public int UpdateBorrow(Borrows borrow)
        {
            int result = 0;
            try
            {
                string query = "UPDATE borrows SET borrows_date = @borrows_date, return_date = @return_date WHERE borrows_id = @borrows_id AND books_id = @books_id AND member_id = @member_id";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@borrows_id", borrow.BorrowsId);
                command.Parameters.AddWithValue("@books_id", borrow.BookId);
                command.Parameters.AddWithValue("@member_id", borrow.MemberId);
                command.Parameters.AddWithValue("@borrows_date", borrow.BorrowDate);
                command.Parameters.AddWithValue("@return_date", borrow.ReturnDate);

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

        // Ödünç silme
        public int DeleteBorrow(int borrows_id)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM borrows WHERE borrows_id = @borrows_id;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@borrows_id", borrows_id);

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

        // Ödünç listeleme
        public List<Borrows> GetBorrows()
        {
            List<Borrows> borrowsList = new List<Borrows>();
            try
            {
                string query = "SELECT borrows_id, books_id, member_id, borrows_date, return_date, DATEDIFF(day, borrows.borrows_date, borrows.return_date) AS Difference FROM borrows;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Borrows borrow = new Borrows();
                    
                    borrow.BorrowsId = Convert.ToInt32(reader["borrows_id"]);
                    borrow.BookId = Convert.ToInt32(reader["books_id"]);
                    borrow.MemberId = Convert.ToInt32(reader["member_id"]);
                    borrow.BorrowDate = Convert.ToDateTime(reader["borrows_date"]);
                    borrow.ReturnDate = Convert.ToDateTime(reader["return_date"]);
                    borrow.Difference = Convert.ToInt32(reader["Difference"]);

                    borrowsList.Add(borrow);
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
            return borrowsList;
        }
    }
}