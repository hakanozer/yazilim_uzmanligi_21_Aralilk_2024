using Days_16.utils;

namespace Days_16 {

    public class Program
    {
        public static void Main(string[] args)
        {

            // array - immutable
            int[] ints = { 10, 20, 30};
            string[] users = { "Ahmet", "Zehra", "Veli", "Mehmet" };
            Console.WriteLine(ints);

            // Collections - mutable
            // ArrayList
            UseArrayList useArrayList = new UseArrayList();
            useArrayList.Call();
            Console.WriteLine("==================");

            // List
            // Generic
            Actions<int> actions = new Actions<int>();
            actions.Add(100);

            UseList useList = new UseList();
            useList.Call();


        }
    }

}