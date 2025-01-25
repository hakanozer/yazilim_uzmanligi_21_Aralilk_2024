using System.Data;

namespace Days_10
{
    class Program
    {
        public static void Main(string[] args)
        {
            //Customer customer = new Customer();

            // Sınıf içindeki özellikleri kullanmak için nesne üretimi yapmak gerekir.
            // SınıfAdı nesneAdı = new SınıfAdı();
            // sınıf içindeki özelliklere (.) ile erişilir.
            Profile profile = new Profile("Erkan", "Bilirim");
            profile.Call();


            DB db = new DB(Edb.SQLITE);
            db.connect();
            db.close();

            // İstisnalar
            for (; ;)
            {
                Console.WriteLine("1. Sayıyı giriniz!");
                string stNum1 = Console.ReadLine();
                Console.WriteLine("2. Sayıyı giriniz!");
                string stNum2 = Console.ReadLine();

                try
                {
                    int num1 = Convert.ToInt32(stNum1);
                    int num2 = Convert.ToInt32(stNum2);
                    int sm = num1 + num2;
                    Console.WriteLine($"Sum: {sm}");
                    break;
                }catch( Exception ex )
                {
                    Console.WriteLine("Lütfen tam sayı ifadeleri giriniz!");
                    Console.WriteLine("Lütfen tekrar deneyiniz!");
                }
            }


            // try - catch
            try
            {
                // hata olma olasığı olan kodlar
                int a = 1;
                int b = 0;
                int i = a / b;
            }
            catch( Exception ex )
            {
                // hata olduğunda çalışacak kodlar
                Console.WriteLine(ex.Message);
                Console.WriteLine("lütfen bölme için 0 dışında bir değer giriniz!");
            }


            Customer customer = new Customer();
            customer.ProfileImageCrop(100, 100);

            Console.WriteLine("This line call");

        
        }
    }
}