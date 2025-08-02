using Microsoft.Data.SqlClient;
using System.Data;

namespace library.utils
{
    public class DB
    {
        private static readonly string _connectionString = "Server=.;Database=library;Integrated Security=True;TrustServerCertificate=True;";
        SqlConnection _connection = new SqlConnection(_connectionString);

        public SqlConnection GetConnection()
        {
            SqlConnection connection = new SqlConnection(_connectionString);
            try
            {
                connection.Open();
                Console.WriteLine("Connection Opened Successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            return connection;
        }

        public void CloseConnection()
        {
            try
            {
                if (_connection.State == System.Data.ConnectionState.Open)
                {
                    _connection.Close();
                    Console.WriteLine("Connection Closed Successfully.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}