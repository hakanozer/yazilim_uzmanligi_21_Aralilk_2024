namespace Days_6
{ 
    class Program
    {
        internal static void Main(string[] args)
        {

            string name = "Ali";
            int age = 30;
            bool status = true;
            char c = 't';
            Console.WriteLine(name);

            Console.WriteLine("Kullanıcı Adınız?");
            string username = Console.ReadLine();

            Console.WriteLine("Şifreniz?");
            string password = Console.ReadLine();

            string usernamePassword = $"{username} - {password}";

            Console.WriteLine(usernamePassword);
            Console.WriteLine($"{username} - {password}");

            // ali01
            // 12345
            if(username.Equals("ali01") && password.Equals("12345"))
            {
                Console.WriteLine("Giriş Başarılı");
            }else
            {
                Console.WriteLine("Bilgiler hatalı!");
            }

            // Bu gün günlerden ne?
            // Pazartesi
            // Salı
            // Cumartesi

            // Bunların dışındaki her gün içinde ortaak mesaj ver.
            // Mesaj olarak -> "Hatalı Gün!"
            string day = "Mehmet";

            if (day.Equals("Pazartesi"))
            {
                Console.WriteLine($"Bu gün :{day}");
            }else if (day.Equals("Salı"))
            {
                Console.WriteLine($"Bu gün :{day}");
            }else if (day.Equals("Cumartesi")) {
                Console.WriteLine($"Bu gün :{day}");
            }else
            {
                Console.WriteLine("Hatalı Gün!");
            }

            Console.WriteLine("=================================");
            // diziler
            // immutable -> oluşturulduktan sonra değişim olamaz.
            string[] users = { "Erkan", "Ahmet", "Faruk", "Serkan" };
            int[] numbers = { 10,44,55,77,22,99,33 };

            int index = -1;
            // index
            // 0'dan başlar, dizi içindeki elemanlara erişim için kullanılır.
            // dizi içideki bir değere users[0] index'i ile erişim sağlanır.

            // size
            // dizi içindeki eleman sayısını(boyut) verir,
            int size = users.Length;
            Console.WriteLine(size);
            if ( size > index && index >= 0 )
            {
                Console.WriteLine(users[index]);
            }
            


        }
    }
}