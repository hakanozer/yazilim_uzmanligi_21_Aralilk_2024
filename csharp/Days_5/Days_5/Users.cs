using System;
namespace Days_5
{
	public class Users
	{

        // methods - functions
        // fonsksiyonlar büyük harfle başlar ve 2. ve sonraki tüm kelimelerde büyük harfle başlarlar.
        // void
        // return
        // () -> methodun alacağı parametleri işaret eder.

        // void
        // bir method'dan geriye bir veri-nesne-değer dönüşü olmayacak ise
        // bu method oluşturulurken void kullanılmalıdır.
        public void UserNameWrite()
        {
            string name = "Mustafa Bilir";
            Console.WriteLine(name);
        }

        public void UserNameConcatSurname(string name, string surname)
        {
            string join = $"Sn. {name} {surname}";
            Console.WriteLine(join);
        }

        public void UserLogin(string email, string password)
        {
            if ( email.Equals("ali@mail.com") && password.Equals("12345"))
            {
                Console.WriteLine("Login Success");
            }else
            {
                Console.WriteLine("Username or Password fail");
            }
        }

        // return
        // fonksiyon tetiklendiğinde geri dönecek veri-nesne-değer
        public int Sum(int num1, int num2)
        {
            int sm = num1 + num2;
            // return anahtar kelimesinden sonra kod yazılamaz.
            return sm;
        }

        public string[] CitiesPlaka( string[] cities, string[] plakas )
        {
            string[] arr = new string[cities.Length];
            for(int i = 0; i < cities.Length; i++)
            {
                string city = cities[i];
                string plaka = plakas[i];
                arr[i] = $"{plaka} - {city}";
            }
            return arr;
        }

        public int StringConvertSum(string stAge, string stNumber)
        {
            int age = Convert.ToInt32(stAge);
            int number = Convert.ToInt32(stNumber);
            int sm = age + number;
            return sm;
        }

        
        public int AreaCall(int x, int y)
        {
            Action action = new Action();
            int y2 = action.call(y);
            int end = x * y2;
            return end;
        }

        public void ComputerCall( string name, int num, Action action )
        {
            if (action != null)
            {
                int end = action.call(num);
                string write = $"{name} - {end}";
                Console.WriteLine(write);
            }else
            {
                Console.WriteLine("Action is not validate!");
            }
        }

        // Overload Method
        // method isimleri aynı ama parametreleri farklı oluduğu için
        // bir birinden ayrılırlar.
        public void call()
        {
            Console.WriteLine("call-1");
        }

        public void call(string a)
        {
            Console.WriteLine($"call-1 {a}");
        }

        public void call(int a)
        {
            Console.WriteLine($"call-2 {a}");
        }


    }
}

