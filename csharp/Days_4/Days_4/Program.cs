namespace Days_4;

class Program
{
    static void Main(String[] argas)
    {
        Console.WriteLine("Lütfen sayı giriniz!");
        int number = Convert.ToInt32(Console.ReadLine());

        int end = number;
        if (end == 0)
        {
            Console.WriteLine($"end: 1");
        }
        else
        {
            for (int i = number - 1; i > 0; i--)
            {
                end = end * i;
            }
            Console.WriteLine($"end: {end}"); ;
        }
    }
}



