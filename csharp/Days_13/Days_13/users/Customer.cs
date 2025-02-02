using System;
namespace Days_13.users
{
	public class Customer : Person
	{
        public override bool Login(string username, string password)
        {
            DBConnect("Customer");
            bool status = false;
            if (username.Equals("c") && password.Equals("c"))
            {
                status = true;
                nameSurname = "Ceylan";
            }
            else if (username.Equals("d") && password.Equals("d"))
            {
                status = true;
                nameSurname = "Deniz";
            }
            return status;
        }


        public void AddBasket( int pid )
        {
            Console.WriteLine("Add Basket Success: " + pid);
        }

    }
}

