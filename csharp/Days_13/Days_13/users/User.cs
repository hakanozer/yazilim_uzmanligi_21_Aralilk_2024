using System;
namespace Days_13.users
{
	public class User : Person
	{
        public override bool Login(string username, string password)
        {
            DBConnect("User");
            bool status = false;
            if(username.Equals("a") && password.Equals("a"))
            {
                status = true;
                nameSurname = "Ali";
            }else if (username.Equals("b") && password.Equals("b"))
            {
                status = true;
                nameSurname = "Betül";
            }
            return status;
        }
    }
}

