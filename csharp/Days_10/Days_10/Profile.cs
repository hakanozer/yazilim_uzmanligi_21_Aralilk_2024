using System;
namespace Days_10
{
	public class Profile
	{
		// Kurucu methodlar
		// Bir sınıf kurulurken sınıf içine parametre göndermeye yarar.

		// Kurallar
		// Sınıf adı ile aynı isme sahip olmalıdır.
		// void - return anahtar kelimesi almazlar.
		// Yazılmadığında default kurucu method çalışmış olur.
		// Yazıldığında artık bizim yazdığımız geçer

		string name = "";
		string surname = "";
		public Profile()
		{
			
		}

		public Profile(string name)
		{
			this.name = name;
		}

		public Profile(string name, string surname)
		{
			this.name = name;
			this.surname = surname;
		}

		public void Call()
		{
			if (!name.Equals(""))
			{
				Console.WriteLine(name);
			}
			if (!surname.Equals(""))
			{
				Console.WriteLine(surname);
			}
		}


		public string ProfileName()
		{
			return "Ali Bilmem";
		}

	}
}