using System;
using Microsoft.Data.SqlClient; 
using LibraryManagementSystem.Models;
using Microsoft.Identity.Client;

public class MemberService
{
    readonly DB _dB;
    public MemberService()
    {
        _dB = new DB();
    }
    public int AddMember(Member member)
    {
        int result = 0;
        try
        {
            string query = "INSERT INTO Members (name, surname, email) VALUES (@name, @surname, @email)";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());
            command.Parameters.AddWithValue("@name", member.name);
            command.Parameters.AddWithValue("@surname", member.surname);
            command.Parameters.AddWithValue("@email", member.email);

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
    public List<Member> GetMembers()
    {
        List<Member> members = new List<Member>();
        try
        {
            string query = "SELECT * FROM Members";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
              int mid = reader.GetInt32(0);
              string name = reader.GetString(1);
              string surname = reader.GetString(2);
              string email = reader.GetString(3);
              string phone = reader.GetString(4);
            }
        }
        catch (System.Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
        finally
        {
            _dB.CloseConnection();
        }
        return members;
    }
    public int UpdateMember(Member member)
    {
        int result = 0;

        try
        {
            string query = "UPDATE Members SET name = @name, surname = @surname, email = @email WHERE mid = @mid";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());

            command.Parameters.AddWithValue("@name", member.name);
            command.Parameters.AddWithValue("@surname", member.surname);
            command.Parameters.AddWithValue("@email", member.email);
            command.Parameters.AddWithValue("@mid", member.mid);

            result = command.ExecuteNonQuery();
        }
        catch (System.Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
        finally
        {
            _dB.CloseConnection();
        }

        return result;
    }
    public int DeleteMember(int mid)
    {
        int result = 0;

        try
        {
            string query = "DELETE FROM Members WHERE mid = @mid";
            SqlCommand command = new SqlCommand(query, _dB.GetConnection());
            command.Parameters.AddWithValue("@mid", mid);

            result = command.ExecuteNonQuery();
        }
        catch (System.Exception ex)
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