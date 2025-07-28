using System;
using System.Data;
using KutuphaneDB.Services;
using KutuphaneDB.Models;



namespace KutuphaneDB
{
    class Program
    {
        static void Main(string[] args)
        {
            KitapService kitapService = new KitapService();
            UyeService uyeService = new UyeService();
            OduncService oduncService = new OduncService();
            YazarService yazarService = new YazarService();

            Console.WriteLine("Kütüphane Yönetim Sistemi'ne Hoşgeldiniz!");
            Console.WriteLine("Lütfen yapmak istediğiniz işlemi seçin:");
            Console.WriteLine("1. Kitap İşlemleri");
            Console.WriteLine("2. Üye İşlemleri");
            Console.WriteLine("3. Ödünç İşlemleri");
            Console.WriteLine("4. Yazar İşlemleri");
            Console.WriteLine("5. Çıkış");
            Console.Write("Seçiminiz: ");
            string secim = Console.ReadLine() ?? string.Empty;
            while (secim != "5")
            {
                switch (secim)
                {
                    case "1":
                        kitapService.KitapIslemleri();
                        break;
                    case "2":
                        uyeService.UyeIslemleri();
                        break;
                    case "3":
                        oduncService.OduncIslemleri();
                        break;
                    case "4":
                        yazarService.YazarIslemleri();
                        break;
                    default:
                        Console.WriteLine("Geçersiz seçim. Lütfen tekrar deneyin.");
                        break;
                }

                Console.WriteLine("Başka bir işlem yapmak ister misiniz? (E/H)");
                string devam = Console.ReadLine() ?? string.Empty;
                if (devam.ToUpper() != "E")
                {
                    break;
                }

                Console.WriteLine("Lütfen yapmak istediğiniz işlemi seçin:");
                Console.WriteLine("1. Kitap İşlemleri");
                Console.WriteLine("2. Üye İşlemleri");
                Console.WriteLine("3. Ödünç İşlemleri");
                Console.WriteLine("4. Yazar İşlemleri");
                Console.WriteLine("5. Çıkış");
                Console.Write("Seçiminiz: ");
                secim = Console.ReadLine() ?? string.Empty;
            }
            Console.WriteLine("Çıkış yapılıyor...");
            Console.WriteLine("Kütüphane Yönetim Sistemi'nden çıkış yaptınız.");
            Console.WriteLine("Görüşmek üzere!");
            Console.ReadLine();
            
           
          
  
        }
    }
}