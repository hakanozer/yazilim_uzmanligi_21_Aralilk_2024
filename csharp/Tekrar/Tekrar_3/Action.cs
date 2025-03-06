using System;
namespace Tekrar_3
{
	public class Action
	{
        // fonksyionlar
        // toplama, cikarma, çarpma, bölme

        // public -> erişim belirteci -> bütün uygulamada görünme
        // int -> geriye dönmesini istediğimiz tür - type
        // topla -> fonksiyona verilen isim
        // (int num1, int num2) -> fonksiyona gönderilecek değerler
        // { } -> fonksiyon body - gövde -> çalışacak kodlar
        // return -> fonksiyonun sonucunun geriye döndüğü yapıdır.
        public int Topla( int num1, int num2 )
        {
            int sum = num1 + num2;
            sum = sum + 10;
            Console.WriteLine("---------------");
            return sum;
        }

        // void -> fonksyiondan geri dönüş olmasın
        public void Call1()
        {
            Console.WriteLine("Call1 Call");
        }



    }
}

