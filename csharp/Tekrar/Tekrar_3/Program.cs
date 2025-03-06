
namespace Tekrar_3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // uygulama ilk başlatıldığında çalışacak kodlar

            // nesne üretim işlemi
            // bir sınıf içindeki özelliği kullanmak için

            // Action -> sınıf adı
            // objAction -> nesne -> sınıf içindeki özelliklere erişim
            // new -> sınıfın bellekte hazır hale gelmesini sağlar
            // Action() -> kurucu method
            Action objAction = new Action();

            // method tetikleme
            // nesneden sonra (.) operatörü ile olur
            int sum1 = objAction.Topla(234, 567);
            Console.WriteLine("Sum1 :" + sum1);

            int sum2 = objAction.Topla(233, 1212);
            Console.WriteLine("Sum2 :" + sum2);

            // void call
           objAction.Call1();

        }
    }
}