using System;
namespace Days_13.users
{
	public class Admin : Person
	{
        public override bool Login(string username, string password)
        {
            DBConnect("Admin");
            bool status = false;
            if (username.Equals("e") && password.Equals("e"))
            {
                status = true;
                nameSurname = "Erdi";
            }
            else if (username.Equals("f") && password.Equals("f"))
            {
                status = true;
                nameSurname = "Fatma";
            }
            return status;
        }
    }
}

