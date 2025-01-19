using Days_9.models;
using Days_9.utils;

namespace Days_9
{
    public class Program
    {
        internal static void Main(string[] args)
        {

            string[] arr = { "TV", "iPhone", "Samsung Galaxy", "Tablet" };
            string[] images = { "tv.jpg", "iphone.jpg", "samsung.jpg", "tablet.jpg" };

            Product p1, p2;
            p1.pid = 100;
            p1.title = "TV"; // set yöntemi
            p1.detail = "TV Detail";
            p1.price = 10000;
            p1.status = true;

            p2.pid = 200;
            if (true)
            {
                p2.title = "iPhone";
            }else
            {
                p2.title = "iPhone X";
            }
            p2.detail = "iPhone Detail";
            p2.price = 30000;
            p2.status = true;

            Product p3 = new Product(300, "Samsung", "Samsung Detail", 20000, true);

            Product[] products = { p1, p2, p3 };
            foreach ( Product item in products )
            {
                Console.WriteLine($"{item.pid} - {item.title} - {item.detail}");
            }
            Console.WriteLine("===================");
            Profile profile = new Profile();
            Product p4 = profile.save(p1);
            Console.WriteLine(p4);

            Console.WriteLine("===================");
            // kullanıcı sayısı?
            // 5
            // her bir kullanıcı için, adı, soyadı, yaş istensin.
            // 5. kullanıcı değeri tamamlandıktan sonra tüm kullanıcı verileri yazılsın.

            Console.WriteLine("Kullanıcı sayınızı giriniz!");
            string stNumber = Console.ReadLine();
            int userCount = Convert.ToInt32(stNumber);
            Console.WriteLine("Kullanıcı Sayısı : " + userCount);

            User[] users = new User[userCount];
            for( int i = 0; i < users.Length; i++ )
            {
                Console.WriteLine($"{i + 1} - . Kullanıcı adını girin!");
                users[i].name = Console.ReadLine();

                Console.WriteLine($"{i + 1} - . Kullanıcı soyadını girin!");
                users[i].surname = Console.ReadLine();

                Console.WriteLine($"{i + 1} - . Kullanıcı yaşını girin!");
                users[i].age = Convert.ToInt32(Console.ReadLine());
            }

            foreach( User item in users )
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("===================");
            int dayNumber = profile.Days(EDay.CARSAMBA);
            Console.WriteLine($"Seçilen Gün : {dayNumber}");


        }
    }
}