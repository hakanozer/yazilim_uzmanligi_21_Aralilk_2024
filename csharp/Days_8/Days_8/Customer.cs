using System;
namespace Days_8
{
	public class Customer
	{
		internal int age = 30;

		public void Call()
		{
			Console.WriteLine("This Line Call");
		}

		public void Params( string name, int? age, string? email )
		{
			Console.WriteLine(name);
			int newAge = age ?? 10;
			Console.WriteLine(newAge);
			string newEmail = email ?? "mail@mail.com";
			Console.WriteLine(newEmail);
		}


	}
}

