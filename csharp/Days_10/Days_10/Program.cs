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
            string stNum1 = "12";
            string stNum2 = "77";

            int num1 = Convert.ToInt32(stNum1);
            int num2 = Convert.ToInt32(stNum2);

            int sm = num1 + num2;
            Console.WriteLine($"Sum: {sm}");
        
        }
    }
}