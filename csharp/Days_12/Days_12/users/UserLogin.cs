using System;
using System.Xml.Linq;

namespace Days_12.users
{
	public class UserLogin
	{

		public string name = "Kemal";
		string dbUrl = "http://db.com";
		string dbUserName = "sa";
		string dbPassword = "12345";

		// kurucu methodlar
		// return - void anahtar kelimesi almazlar
		// sınıf adı ile aynı isimde olması zorunludur
		// kurucu method yazdılığında default olarak gelen iptal olur.
		public UserLogin()
		{
			UserRegister();
		}

		public UserLogin(string dbUrl)
		{
			this.dbUrl = dbUrl;
		}

        public UserLogin(string dbUrl, string name)
        {
			this.dbUrl = dbUrl;
			this.name = name;
        }

        public void UserRegister()
		{
			Console.WriteLine(dbUrl);
		}

		public bool UserRemember()
		{
			Console.WriteLine(dbUrl);
			if (name.Equals("ali"))
			{
				return true;
			}
			return false;
		}

	}

}

