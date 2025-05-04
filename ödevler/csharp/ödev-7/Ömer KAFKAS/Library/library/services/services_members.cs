using System.Data;
using Microsoft.Data.SqlClient;
using library.Models;
using library.utils;
using Microsoft.Identity.Client;

namespace library.services
{
    public class services_members
    {
        readonly DB _dB;

        public services_members()
        {
            _dB = new DB();
        }

        // Üye ekleme
        public int AddMember(Member member)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO members member_name, member_surname, member_email, member_phone VALUES ( @member_name, @member_surname, @member_email, @member_phone); SELECT SCOPE IDENTITY;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@member_name", member.MemberName);
                command.Parameters.AddWithValue("@member_surname", member.MemberSurname);
                command.Parameters.AddWithValue("@member_email", member.MemberEmail);
                command.Parameters.AddWithValue("@member_phone", member.MemberPhone);

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

        //Üye güncelleme

        public int UpdateMember(Member member)
        {
            int result = 0;
            try
            {
                string query = "UPDATE members SET member_name = @member_name, member_surname = @member_surname, member_email = @member_email, member_phone = @member_phone; WHERE member_id = @member_id;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@member_id", member.MemberID);
                command.Parameters.AddWithValue("@member_name", member.MemberName);
                command.Parameters.AddWithValue("@member_surname", member.MemberSurname);
                command.Parameters.AddWithValue("@member_email", member.MemberEmail);
                command.Parameters.AddWithValue("@member_phone", member.MemberPhone);

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

        //Üye silme
        public int DeleteMember(int member_id)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM members WHERE member_id = @member_id;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@member_id", member_id);

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

        //Üye listeleme
        public List<Member> listMembers()
        {
            List<Member> members = new List<Member>();
            try
            {
                string query = "SELECT * FROM members;";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlConnection connection = _dB.GetConnection();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Member member = new Member();
                    member.MemberID = Convert.ToInt32(reader["member_id"]);
                    member.MemberName = reader["member_name"]?.ToString() ?? string.Empty;
                    member.MemberSurname = reader["member_surname"]?.ToString() ?? string.Empty;
                    member.MemberEmail = reader["member_email"]?.ToString() ?? string.Empty;
                    member.MemberPhone = reader["member_phone"]?.ToString() ?? string.Empty;
                    members.Add(member);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            return members;
        }
    }
}