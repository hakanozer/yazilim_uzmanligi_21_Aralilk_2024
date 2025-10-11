using ProductCatalogApp.Models;
using ProductCatalogApp.Services;
using ProductCatalogApp.Utils;
using System;

class Program
{
    static void Main(string[] args)
    {
         CategoryService categoryService = new();
         ProductService productService = new();

        while (true)
        {
            Console.Clear();
            Console.WriteLine("=== ÜRÜN KATALOĞU SİSTEMİ ===");
            Console.WriteLine("1 - Kategori Ekle");
            Console.WriteLine("2 - Kategorileri Listele");
            Console.WriteLine("3 - Ürün Ekle");
            Console.WriteLine("4 - Ürünleri Listele");
            Console.WriteLine("5 - Ürün Ara");
            Console.WriteLine("6 - Ürün Filtrele");
            Console.WriteLine("0 - Çıkış");
            Console.Write("Seçiminiz: ");

            var secim = Console.ReadLine();

            switch (secim)
            {
                case "1":
                    Console.Write("Kategori Adı: ");
                    var kategoriAdi = Console.ReadLine();
                    categoryService.Ekle(new Category { Name = kategoriAdi });
                    Console.WriteLine("Yeni kategori eklendi.");                   
                    break;

                case "2":
                    var kategoriler = categoryService.Listele();
                    Console.WriteLine("\n--- Kategoriler ---");
                    foreach (var k in kategoriler)
                        Console.WriteLine($"ID: {k.Id} | Ad: {k.Name}");
                    //Console.ReadKey();
                    break;

                case "3":
                    Console.Write("Ürün Adı: ");
                    var urunAdi = Console.ReadLine();
                    Console.Write("Açıklama: ");
                    var aciklama = Console.ReadLine();
                    Console.Write("Fiyat: ");
                    decimal fiyat = decimal.Parse(Console.ReadLine() ?? "0");
                    Console.Write("Stok: ");
                    int stok = int.Parse(Console.ReadLine() ?? "0");
                    Console.Write("Kategori ID: ");
                    var kategoriId = Console.ReadLine();

                    productService.Ekle(new Product
                    {
                        Name = urunAdi,
                        Description = aciklama,
                        Price = fiyat,
                        Stock = stok,
                        CategoryId = kategoriId
                    });
                    break;

                case "4":
                    var urunler = productService.Listele();
                    foreach (var u in urunler)
                        Console.WriteLine($"ID: {u.Id} | Ad: {u.Name} | Fiyat: {u.Price} | Stok: {u.Stock}");
                    Console.ReadKey();
                    break;

                case "5":
                    Console.Write("Aranacak kelime: ");
                    var anahtar = Console.ReadLine();
                    var aramaSonuc = productService.Ara(anahtar);
                    foreach (var u in aramaSonuc)
                        Console.WriteLine($"ID: {u.Id} | Ad: {u.Name} | Açıklama: {u.Description}");
                    Console.ReadKey();
                    break;

                case "6":
                    Console.Write("Min Fiyat: ");
                    string? minStr = Console.ReadLine();
                    Console.Write("Max Fiyat: ");
                    string? maxStr = Console.ReadLine();
                    Console.Write("Kategori ID (boş bırakılabilir): ");
                    var catId = Console.ReadLine();

                    decimal? minFiyat = decimal.TryParse(minStr, out decimal min) ? min : null;
                    decimal? maxFiyat = decimal.TryParse(maxStr, out decimal max) ? max : null;

                    var filtreSonuc = productService.Filtrele(minFiyat, maxFiyat, catId);
                    foreach (var u in filtreSonuc)
                        Console.WriteLine($"ID: {u.Id} | Ad: {u.Name} | Fiyat: {u.Price}");
                    Console.ReadKey();
                    break;

                case "0":
                    return;

                default:
                    Console.WriteLine("Geçersiz seçim.");
                    Console.ReadKey();
                    break;
            }
        }


        /*
        // Hata loglama örneği:
        var categoryService = new CategoryService();

        // Aynı adı 2 kez ekleyerek hata oluşmasını sağlıyoruz:
        var Category = new Category { Name = "Elektronik" };
        categoryService.Ekle(Category); // 1. kez eklenir
        categoryService.Ekle(Category); // 2. kez hata verir (duplicate)

        Console.WriteLine("Log dosyasını kontrol edin: hata_log.txt");


        */




    }
}


