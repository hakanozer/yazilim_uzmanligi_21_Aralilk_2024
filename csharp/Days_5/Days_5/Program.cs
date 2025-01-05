using System;
namespace Days_5;

class Program
{
    static void Main(string[] args)
    {

        // nesne üretimi
        Users users = new Users();
        // "." -> ile nesne içindeki özellikler kullanıma uygun olur.

        users.UserNameWrite();

        users.UserNameConcatSurname("Zehra", "Bilirim");
        users.UserNameConcatSurname("Ali", "Bilmem");

        users.UserLogin("ali@mail.com", "12345");

        int sm = users.Sum(100, 555);
        Console.WriteLine($"Sum: {sm}");

        // dizideki her bir elemanın başına şehir plakasını ekle
        string[] cities = { "İstanbul", "Ankara", "Adana", "İzmir" };
        string[] plakas = { "34", "06", "01", "35" };
        cities = users.CitiesPlaka(cities, plakas);
        foreach( string item in cities )
        {
            Console.WriteLine(item);
        }


        int stSum = users.StringConvertSum("25", "77");
        if(stSum > 50)
        {
            Console.WriteLine("stSum > 50");
        }else
        {
            Console.WriteLine("stSum < 50");
        }

        Action action = new Action();
        users.ComputerCall("Macbook Pro", 50, action);

        users.call();
        users.call(100);
        users.call("Merhaba");
    }
}


