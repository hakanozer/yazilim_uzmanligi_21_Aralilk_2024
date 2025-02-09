using Days_15.car_fabric;
using Days_15.properties;

namespace Days_15
{
    public class Program
    {

        public static void Main(string[] args)
        {
            // 100 - 200 - 300
            Person person = new Person(200);
            Console.WriteLine(person.GetName());
            Console.WriteLine(person.GetTotal());
            Console.WriteLine("===================");

            Merdeces merdeces = new Merdeces();
            Bmw bmw = new Bmw();
            Togg togg = new Togg();

            merdeces.Report();
            bmw.Report();
            togg.Report();

            Console.WriteLine("===================");
            ProductModel p1;
            p1.pid = 100;
            p1.title = "TV";
            p1.detail = "TV Detail";
            p1.price = 30000;

            Console.WriteLine("===================");
            Product pr1 = new Product();
            pr1.pid = 10;
            pr1.title = "su";
            Console.WriteLine(pr1.pid);

        }

    }
}