using System;
using System.Collections;
using Days_16.models;

namespace Days_16
{
	public class UseArrayList
	{

		public void Call()
		{

			// ArrayList
			// Tür farklılığı olmaksızın
			// tüm değerleri dinamik kullanan
			ArrayList list = new ArrayList();

			// Add
			list.Add("Ahmet");
			list.Add("Mehmet");
            list.Add("Ali");
            list.Add("Zehra");
            list.Add("Furkan");
            list.Add("Haktan");
			list.Add(100);
			list.Add(true);
			list.Add(10.6);

            int size = list.Count;
            Console.WriteLine(size);


			// remove
			// list.Remove("Ali");
			// list.RemoveAt(1); // index'e göre sil

			// contains
			bool dataStatus = list.Contains("Zehra");
			Console.WriteLine($"dataStatus: {dataStatus} ");


            for ( int i = 0; i < list.Count; i++ )
			{
				object item = list[i];
				if (item is string)
				{
					string stItem = (string)item;
					Console.WriteLine( stItem.Length );
				}
				Console.WriteLine( list[i] );
			}

			User u1 = new User("Ali", "Bilmem", "ali@mail.com", "12345");
            User u2 = new User("Veli", "Bil", "veli@mail.com", "12345");
            User u3 = new User("Zehra", "Bilirim", "zehra@mail.com", "12345");
            User u4 = new User("Ayşe", "Bilsin", "ayse@mail.com", "12345");

			ArrayList users = new ArrayList();
			users.Add(u1);
            users.Add(u2);
            users.Add(u3);
            users.Add(u4);

			users.RemoveAt(1);

			foreach ( User item in users )
			{
				Console.WriteLine(item);
			}

        }


	}
}

