using Microsoft.Data.SqlClient;

namespace Days_19
{
    public class DB
    {
        public static SqlConnection GetConnection()
        {
            string connectionString = "Server=localhost,1433; Database=contacts; User Id=SA; Password=StrongPassword123!; TrustServerCertificate=True;";
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            Console.WriteLine("Connection Opened");
            return connection;
        }
    }
}