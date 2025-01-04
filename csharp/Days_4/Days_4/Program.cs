namespace Days_4;

class Program
{
    static void Main(String[] argas)
    {
        Console.WriteLine("Lütfen sayı giriniz!");
        //int number = Convert.ToInt32(Console.ReadLine());
        int number = 5;

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

        Console.WriteLine("=====================");
        string[] days = { "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe" };
        //string[] daysx = new string[5];
        //int[] daysNumber = new int[5];
        //String[] daysy = new String[5];
        //daysx[0] = "Pazar";
        //Console.WriteLine("daysx-1 " + daysNumber[1] );

        //Console.WriteLine("Arkadaş sayınızı belirtin");
        //int count = Convert.ToInt32(Console.ReadLine());
        //string[] frends = new string[count];

        for(int i = 0; i < days.Length; i++)
        {
            string item = days[i];
            if (item.Equals("Salı")) {
                Console.WriteLine("Salı Bulundu");
                break; // for loop işlemini tamamla.
            }
            Console.WriteLine($"item: {item}");
        }

        Console.WriteLine("=====================");
        string[] words = { "teknoloji", "spor", "yazılım", "şehir", "bilgisayar", "elektronik" };
        string[] keys = { "spor", "şehir", "elektronik" };
        for(int i = 0; i < words.Length; i++)
        {
            string item = words[i];
            if (item.Equals("spor"))
            {
                continue; // bu adımı atla, diğerleri ile devam et.
            }
            Console.WriteLine(item);
        }

        Console.WriteLine("=====================");
        for(int i = 0; i < 10; i++)
        {
            for(int j = 0; j < 10; j++)
            {
                if (j == 5)
                {
                    continue;
                }
                Console.WriteLine($" i: {i} j: {j} ");
            }
        }

        Console.WriteLine("=====================");
        for(int i = 0; i < words.Length; i++)
        {
            string item = words[i];
            bool status = false;
            for(int j = 0; j < keys.Length; j++)
            {
                string key = keys[j];
                if ( item.Equals(key) )
                {
                    status = true;
                }
            }

            if (status == true)
            {
                continue;
            }
            Console.WriteLine(item);
        }
        Console.WriteLine("=====================");
        // foreach -> sıra yada koşul belirtmeksizin tüm dizi elemanalrını
        // sayan bir kod parçasıdır.
        // bir dizi içindeki tüm elemanlara ait işlem yapılacak ise kullanılır.
        foreach( string item in days )
        {
            if(item.Equals("Pazartesi"))
            {
                continue;
            }
            if(item.Equals("Çarşamba"))
            {
                break;
            }
            Console.WriteLine(item);
        }

        Console.WriteLine("=====================");
        string data = "Bu gün günlerden Cumartesi";
        Console.WriteLine($"size : {data.Length}");
        int x = 0;
        foreach( char item in data )
        {
            Console.WriteLine($"i: {x} - item : {item}");
            x++;
        }

        Console.WriteLine("=====================");
        // while
        /*
         while(koşul) {
            while koşulu sağlandığında çalışacak kodlar
         }
        */
        int a = 0;
        while(a < 10)
        {
            if (a == 5)
            {
                // while içindeki kullanımı bundan sonraki tüm uygulamayı durdur.
                //continue;
                break;
            }
            Console.WriteLine($"While Call - {a}");
            a++;
        }

        Console.WriteLine("=====================");
        // do - while
        // koşul sağlanmasa bile en az bir kez çalışan döngüdür.
        int y = 0;
        do
        {
            // koşul sağlandığından koşul sayısı kadar çalışan kod yazılır.
            // koşul sağlanmadığında 1 kez çalışan kod.
            if (y == 5)
            {
                continue;
                //break;
            }
            Console.WriteLine($"do - while call: {y}");
            y++;
        } while (y < 10);

        Console.WriteLine("This line call");

    }
}



