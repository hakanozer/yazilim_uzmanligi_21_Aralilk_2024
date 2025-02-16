using System;
namespace Days_17
{
	public class UseQueue
	{
		public void Call()
		{

			Queue<string> users = new Queue<string>();

			// Add item
			users.Enqueue("Ali");
            users.Enqueue("Veli");
            users.Enqueue("Zehra");
            users.Enqueue("Ahmet");
            users.Enqueue("Zeki");

			// first item remove
			users.Dequeue();

			foreach(string item in users)
			{
				Console.WriteLine(item);
			}
        }
	}
}

