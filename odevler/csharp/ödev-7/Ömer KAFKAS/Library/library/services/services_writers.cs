using System.Data;
using Microsoft.Data.SqlClient;
using library.Models;
using library.utils;


namespace library.services
{
    public class services_writers
    {
        readonly DB _dB;
        
        public services_writers()
        {
            _dB = new DB();
        }

        // Yazar ekleme
        public int AddWriter(Writer writer)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO writers (writers_name, writers_surname) VALUES (@writersname, @writerssurname); ";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@writersname", writer.WritersName);
                command.Parameters.AddWithValue("@writerssurname", writer.WritersSurname);

                result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return result;
        }

        // Yazar güncelleme
        public int UpdateWriter(Writer writer)
        {
            int result = 0;
            try
            {
                string query = "UPDATE writers SET  writers_name = @writers_name, writers_surname = @writers_surname; WHERE writers_id;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@writers_id", writer.WritersID);
                command.Parameters.AddWithValue("@writers_name", writer.WritersName);
                command.Parameters.AddWithValue("@writers_surname", writer.WritersSurname);

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

        // Yazar silme
        public int DeleteWriter(int writerId)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Writers WHERE writers_id = @writers_id";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@writers_id", writerId);

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

        // Yazarları listeleme
        public List<Writer> ListWriters()
        {
            List<Writer> writers = new List<Writer>();
            try
            {
                string query = "SELECT * FROM writers;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Writer writer = new Writer();
                    writer.WritersName = reader["writers_name"]?.ToString() ?? string.Empty;
                    writer.WritersSurname = reader["writers_surname"]?.ToString()?? string.Empty;
                    writers.Add(writer);                   
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
            return writers;
        }
    }
}