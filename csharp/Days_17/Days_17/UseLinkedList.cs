using System;
using Days_16.models;

namespace Days_17
{
	public class UseLinkedList
	{
		public void Call()
		{

			LinkedList<User> users = new LinkedList<User>();

            User u1 = new User("Ali", "Bilmem", "ali@mail.com", "12345");
            User u2 = new User("Veli", "Bil", "veli@mail.com", "12345");
            User u3 = new User("Zehra", "Bilirim", "zehra@mail.com", "12345");
            User u4 = new User("Ayşe", "Bilsin", "ayse@mail.com", "12345");

			users.AddFirst(u1);
            users.AddBefore(users.First,u2);
            u2.Name = "Hasan";
            users.AddBefore(users.First, u2);
            //users.AddBefore(users.Last,u2);
            //users.AddLast(u4);

            foreach (User item in users)
            {
                Console.WriteLine(item);
            }


        }
	}
}

