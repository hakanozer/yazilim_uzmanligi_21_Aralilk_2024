using System;
namespace Days_17
{
	public class UseDictionary
	{
		public void Call()
		{

			Dictionary<string, string> users = new Dictionary<string, string>();

			// add item
			users.Add("ali", "Ali Bilmem");
			users.Add("ahmet", "Ahmet Bil");
            users.Add("zehra", "Zehra Bilsin");
            users.Add("alibil", "Ali Bilsinler");

            Console.WriteLine(users["ali"]);
			Console.WriteLine(users.Count);

			// all keys
			Dictionary<string, string>.KeyCollection keys = users.Keys;

            foreach (string key in keys)
			{
				string val = users[key];
				Console.WriteLine($"key: {key} - val: {val}");
			}

			string data = users.GetValueOrDefault("kemal", "Kemal Yok"); 
			Console.WriteLine(data);

			bool statusKey = users.ContainsKey("kemal");
			Console.WriteLine(statusKey);

			// delete item
			users.Remove("ali");

			// all values
			Console.WriteLine("----------------------");
            Dictionary<string, string>.ValueCollection values = users.Values;
			foreach(string item in values)
			{
				Console.WriteLine(item);
			}
        }
	}
}

