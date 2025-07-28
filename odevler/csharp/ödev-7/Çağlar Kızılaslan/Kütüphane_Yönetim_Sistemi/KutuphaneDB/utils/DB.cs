using Microsoft.Data.SqlClient;

namespace KutuphaneDB
{
    public class DB
    {
        static string _connectionString = "Server=localhost,1433; Database=library; User Id=sa; Password=StrongPassword123!; TrustServerCertificate=True;";
        public SqlConnection connection = new SqlConnection(_connectionString);
        public SqlConnection GetConnection()
        {
            
            try
            {
                if (connection.State == System.Data.ConnectionState.Closed)
                {
                    connection.Open();
                    Console.WriteLine("Connection Opened");
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Connection Error: " + ex.Message);
            }
            return connection;
        }

        public void CloseConnection(SqlConnection connection)
        {
            if (connection != null && connection.State == System.Data.ConnectionState.Open)
            {
                connection.Close();
                Console.WriteLine("Connection Closed");
            }
        }
    }
}