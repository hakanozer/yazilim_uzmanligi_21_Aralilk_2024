using Microsoft.Data.SqlClient;

public class DB
{
    static string _connectionString = "Server=localhost,1433; Database=library; User Id=SA; Password=StrongPassword123!; TrustServerCertificate=True;";
    public SqlConnection _connection= new SqlConnection(_connectionString);
    public SqlConnection GetConnection()
    {
        try 
        {
            if (_connection.State == System.Data.ConnectionState.Closed)
            {
                _connection.Open();
                Console.WriteLine("Connection opened");
            }
        }
        catch (SqlException ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
        return _connection;
    }
   public void CloseConnection()
    {
        try
        {
            if (_connection.State == System.Data.ConnectionState.Open)
            {
                _connection.Close();
                Console.WriteLine("Connection closed");
            }
        }
        catch (SqlException ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
    }
}