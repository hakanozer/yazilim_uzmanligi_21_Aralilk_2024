using System;
namespace Days_17
{
	public class UseSortedSet
	{
		public void Call()
		{
			SortedSet<string> sortedSet = new SortedSet<string>();

			// add item
			sortedSet.Add("Erkan");
            sortedSet.Add("Erkan");
            sortedSet.Add("Erkan");
            sortedSet.Add("Ali");
            sortedSet.Add("Ali");
            sortedSet.Add("Zehra");
            sortedSet.Add("Serkan");
            sortedSet.Add("Ayşe");
            sortedSet.Add("Ayşe");
            sortedSet.Add("Ayşe");

            foreach(string item in sortedSet)
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("-----------------");
            SortedSet<int> ints = new SortedSet<int>();

            ints.Add(13);
            ints.Add(12);
            ints.Add(0);
            ints.Add(0);
            ints.Add(66);
            ints.Add(13);
            ints.Add(5);
            ints.Add(-1);
            ints.Add(2);
            ints.Add(13);
            ints.Add(0);
            ints.Add(1);

            foreach(int item in ints)
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("-----------------");
            foreach(int item in ints.Reverse())
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("-----------------");
            //ints.Clear();
            for (int i = ints.Count - 1; i >= 0; i--)
            {
                Console.WriteLine(ints.ElementAt(i));
            }

            
        }
	}
}

