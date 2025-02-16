using System;
namespace Days_17
{
	public class UseStack
	{
		public void Call()
		{

			Stack<string> users = new Stack<string>();

            // item add
            users.Push("Ali");
            users.Push("Veli");
            users.Push("Zehra");
            users.Push("Ahmet");
            users.Push("Zeki");

            // remove item - en son item
            users.Pop();

            // Copy To - boş diziyi doldurur
            string[] arr = new string[users.Count];
            users.CopyTo(arr, 0);
            Console.WriteLine(arr[0]);
            Console.WriteLine("-----------------");

            foreach (string item in users)
            {
                Console.WriteLine(item);
            }

        }
	}
}

