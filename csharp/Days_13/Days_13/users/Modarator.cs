using System;
namespace Days_13.users
{
	public class Modarator : Person
	{
        public override bool Login(string username, string password)
        {
            return true;
        }


        public void getStatus( int uid )
        {
            if (uid > 100)
            {
                Login("a", "a");
            }else
            {
                base.Login("b", "b");
            }
        }

    }
}

