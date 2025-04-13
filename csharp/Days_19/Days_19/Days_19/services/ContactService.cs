using System.Data;
using Microsoft.Data.SqlClient;
using Days_19.Models;
using Days_19.Utils;

namespace Days_19.Services
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

        public int UpdateContact(Contact contact)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Contact SET Name = @Name, Surname = @Surname, Email = @Email, Phone = @Phone, Address = @Address WHERE Cid = @Cid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Name", contact.Name);
                command.Parameters.AddWithValue("@Surname", contact.Surname);
                command.Parameters.AddWithValue("@Email", contact.Email);
                command.Parameters.AddWithValue("@Phone", contact.Phone);
                command.Parameters.AddWithValue("@Address", contact.Address);
                command.Parameters.AddWithValue("@Cid", contact.Cid);

                result = command.ExecuteNonQuery(); // etkilenen satır sayısını döndürür
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

        public int DeleteContact(int id)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Contact WHERE Cid = @Cid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Cid", id);
                result = command.ExecuteNonQuery(); // etkilenen satır sayısını döndürür
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


        public List<Contact> GetAllContacts() {
            List<Contact> contacts = new List<Contact>();
            try 
            {
                string query = "select * from Contact";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Contact contact = new Contact();
                    contact.Cid = Convert.ToInt32(reader["cid"]);
                    contact.Name = reader["name"].ToString();
                    contact.Surname = reader["surname"].ToString();
                    contact.Email = reader["email"].ToString();
                    contact.Phone = reader["phone"].ToString();
                    contact.Address = reader["address"].ToString();
                    contacts.Add(contact);
                }
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return contacts;
        }

        public Contact GetContactById(int id)
        {
            Contact contact = new Contact();
            try
            {
                string query = "select * from Contact where cid=@cid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@cid", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    contact.Cid = Convert.ToInt32(reader["cid"]);
                    contact.Name = reader["name"].ToString();
                    contact.Surname = reader["surname"].ToString();
                    contact.Email = reader["email"].ToString();
                    contact.Phone = reader["phone"].ToString();
                    contact.Address = reader["address"].ToString();
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
            return contact;
        }

        public List<Contact> SearchContact(string q, int page) {
            List<Contact> contacts = new List<Contact>();
            try{
                string query = "SELECT * FROM contact c WHERE c.name LIKE @q OR c.surname LIKE @q OR c.email  LIKE @q OR c.phone LIKE @q OR c.address LIKE @q ORDER BY c.cid ASC OFFSET @page ROWS FETCH NEXT 2 ROWS ONLY";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@q", "%" + q + "%");
                command.Parameters.AddWithValue("@page", page);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Contact contact = new Contact();
                    contact.Cid = Convert.ToInt32(reader["cid"]);
                    contact.Name = reader["name"].ToString();
                    contact.Surname = reader["surname"].ToString();
                    contact.Email = reader["email"].ToString();
                    contact.Phone = reader["phone"].ToString();
                    contact.Address = reader["address"].ToString();
                    contacts.Add(contact);
                }
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return contacts;
        }

        public List<Contact> GetTop10View() {
            List<Contact> contacts = new List<Contact>();
            try 
            {
                string query = "SELECT * from Top10View";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Contact contact = new Contact();
                    contact.Cid = Convert.ToInt32(reader["cid"]);
                    contact.Name = reader["name"].ToString();
                    contact.Surname = reader["surname"].ToString();
                    contact.Email = reader["email"].ToString();
                    contact.Phone = reader["phone"].ToString();
                    contact.Address = reader["address"].ToString();
                    contacts.Add(contact);
                }
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return contacts;
        }


        public List<Contact> GetProd(int page) {
            List<Contact> contacts = new List<Contact>();
            try 
            {
                SqlCommand command = new SqlCommand() { 
                    CommandText = "proContact", 
                    CommandType = CommandType.StoredProcedure, 
                    Connection = _dB.GetConnection() 
                };
                
                SqlParameter pageParam = new SqlParameter() { 
                    ParameterName = "@page", 
                    SqlDbType = SqlDbType.Int, 
                    Direction = ParameterDirection.Input, 
                    Value = page 
                };
                command.Parameters.Add(pageParam);

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Contact contact = new Contact();
                    contact.Cid = Convert.ToInt32(reader["cid"]);
                    contact.Name = reader["name"].ToString();
                    contact.Surname = reader["surname"].ToString();
                    contact.Email = reader["email"].ToString();
                    contact.Phone = reader["phone"].ToString();
                    contact.Address = reader["address"].ToString();
                    contacts.Add(contact);
                }
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return contacts;
        }


        public List<CityContact> GetCityContact() {
            List<CityContact> contacts = new List<CityContact>();
            try 
            {
                string query = "SELECT cc.cid, cc.tid, c.name, c.surname, c.email, c.phone, ti.SehirAdi, ti.Yuzolcumu, ti.Bolge, ti.Nufus FROM City_Concat cc INNER JOIN contact c ON c.cid = cc.cid INNER JOIN TurkiyeIlleri ti ON ti.Id = cc.tid";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    CityContact contact = new CityContact();
                    contact.Cid = Convert.ToInt32(reader["cid"]);
                    contact.Tid = Convert.ToInt32(reader["tid"]);
                    contact.Name = reader["name"].ToString();
                    contact.Surname = reader["surname"].ToString();
                    contact.Email = reader["email"].ToString();
                    contact.Phone = reader["phone"].ToString();
                    contact.SehirAdi = reader["SehirAdi"].ToString();
                    contact.Yuzolcumu = Convert.ToSingle(reader["Yuzolcumu"]);
                    contact.Bolge = reader["Bolge"].ToString();
                    contact.Nufus = Convert.ToInt32(reader["Nufus"]);
                    contacts.Add(contact);
                }
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return contacts;
        }
        



    }
}

