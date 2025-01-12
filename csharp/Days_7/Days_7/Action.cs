using System;
namespace Days_7
{
	public class Action
	{
		int age = 30;

		// parametresiz
		// parametreli
		// return'lü
		// return'süz

		// public -> master seviyesi dahil her yerden görün
		// internal -> module seviyesinde görünme
		// private -> sadece mevcut class içinde görünme yeteneği

		// void -> fonksiyondan geri dönşün olmadığı durumda kullanılır.
		// return -> geriye dönecek yanıtın türünü ifade eder

		public void NoParams()
		{
			// fonksiyon tetiklenldiğinde çalışacak gövde
			string name = "Ali Bilmem";
			Console.WriteLine(name);
		}


		public void Params( string title, int price )
		{
			// string joinSt = title + " - " + price;
			price = price - ((price * 10) / 100);
			string join = $"{title} - {price}";
			Console.WriteLine(join);
		}

		public int sum( int num1, int num2 )
		{
			int sm = num1 + num2;
			return sm;
		}

		public bool UserNamePasswordLogin( string username, string password )
		{
			bool status = false;
			if ( username.Equals("kemal01") && password.Equals("12345") )
			{
				status = true;
			}
 			return status;
		}


	}
}

