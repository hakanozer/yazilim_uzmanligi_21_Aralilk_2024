namespace Days_7
{
    public class Program
    {
        internal static void Main(string[] args)
        {

            // immutable
            // array
            string[] users = { "Ahmet", "Erkan", "Serkan", "Zehra", "Ayşe", "Mehmet" };
            Console.WriteLine(users[1]);
            users[1] = "Kemal";
            Console.WriteLine(users[1]);

            Console.WriteLine("==================");
            for (int i = 0; i < users.Length; i++)
            {
                string item = users[i];
                Console.WriteLine(item);
            }

            Console.WriteLine("==================");
            foreach (string item in users)
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("==================");
            foreach (string item in users)
            {
                Console.WriteLine(item);
                if (item.Equals("Serkan"))
                {
                    break; // loop davranışını tamamlar.
                }

            }

            Console.WriteLine("==================");
            foreach (string item in users)
            {
                if (item.Equals("Zehra") || item.Equals("Kemal"))
                {
                    continue; // bu adımı gördüğünde işlem yapma
                }
                Console.WriteLine(item);
            }

            Console.WriteLine("==================");
            // nesne üretimi
            // Action -> Sınıfın adı
            // action -> nesne adı
            // new -> aynısının kopyasını üretir. Bellek seviyesinde kullanıma hazırlık.
            // Action() -> kurucu method.
            Action action = new Action();

            // nesne aldındaki özelliklere (.) oparatörü ile erişim sağlanır.
            action.NoParams();
            action.NoParams();
            action.NoParams();

            action.Params("TV", 10000);
            action.Params("iPhone", 65000);
            action.Params("Samsung", 45000);

            Console.WriteLine("1. Sayıyı giriniz");
            int num1 = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("2. Sayıyı giriniz");
            int num2 = Convert.ToInt32(Console.ReadLine());

            int sum = action.sum(num1, num2);
            Console.WriteLine("Sum :" + sum);

            // kullanıcıadı ve şifre ile giriş yapan bir fonksyion yaz.
            // bool bir yanıt geriye dönsün
            // örn: kemal01 - 12345
            Console.WriteLine("Username?");
            string username = Console.ReadLine();

            Console.WriteLine("Password?");
            string password = Console.ReadLine();

            bool loginStatus = action.UserNamePasswordLogin(username, password);
            Console.WriteLine($"Login Status: {loginStatus}");

        }

    }

}

