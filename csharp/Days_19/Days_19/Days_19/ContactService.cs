using System.Data;
using Microsoft.Data.SqlClient;
using Days_19.Models;

namespace Days_19
{
    public class ContactService
    {
        readonly DB _dB;

        public ContactService()
        {
            _dB = new DB();
        }

        public int AddContact(Contact contact)
        {
            int result = 0;
            try
            {
                // insert query
                string query = "INSERT INTO Contact (Name, Surname, Email, Phone, Address) VALUES (@Name, @Surname, @Email, @Phone, @Address); SELECT SCOPE_IDENTITY();";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Name", contact.Name);
                command.Parameters.AddWithValue("@Surname", contact.Surname);
                command.Parameters.AddWithValue("@Email", contact.Email);
                command.Parameters.AddWithValue("@Phone", contact.Phone);
                command.Parameters.AddWithValue("@Address", contact.Address);

                //result = Convert.ToInt32(command.ExecuteScalar()); // SCOPE_IDENTITY() ile eklenen kaydın ID'sini alır
                result = command.ExecuteNonQuery(); // etkilenen satır sayısını döndürür

            }catch (SqlException ex)
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