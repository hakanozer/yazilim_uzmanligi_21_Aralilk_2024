using System.Data;
using Microsoft.Data.SqlClient;
using KutuphaneDB.Models;

namespace KutuphaneDB.Services
{
    public class KitapService
    {
        public void KitapIslemleri()
        {
            Console.WriteLine("Kitap İşlemleri");
            Console.WriteLine("1. Kitap Ekle");
            Console.WriteLine("2. Kitap Güncelle");
            Console.WriteLine("3. Kitap Sil");
            Console.WriteLine("4. Kitapları Listele");
            Console.WriteLine("5. Ana Menüye Dön");
            Console.Write("Seçiminiz: ");
            string secim = Console.ReadLine() ?? string.Empty;
            switch (secim)
            {
                case "1":
                    // Kitap ekleme işlemi
                    Console.Write("Kitap Başlığı: ");
                    string baslik = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yazar ID: ");
                    int yazarId;
                    while (!int.TryParse(Console.ReadLine(), out yazarId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yayın Yılı: ");
                    int yayinYili;
                    while (!int.TryParse(Console.ReadLine(), out yayinYili))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("ISBN: ");
                    string isbn = Console.ReadLine() ?? string.Empty;
                    Kitaplar yeniKitap = new Kitaplar
                    {
                        Baslik = baslik,
                        YazarID = yazarId,
                        YayinYili = yayinYili,
                        İSBN = isbn
                    };
                    int ekleSonuc = KitapEkle(yeniKitap);
                    if (ekleSonuc > 0)
                    {
                        Console.WriteLine("Kitap başarıyla eklendi.");
                    }
                    else
                    {
                        Console.WriteLine("Kitap eklenirken bir hata oluştu.");
                    }
                    break;
                case "2":
                    // Kitap güncelleme işlemi
                    Console.Write("Güncellenecek Kitap ID: ");
                    int kitapId;
                    while (!int.TryParse(Console.ReadLine(), out kitapId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Kitap Başlığı: ");
                    string yeniBaslik = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yeni Yazar ID: ");
                    int yeniYazarId;
                    while (!int.TryParse(Console.ReadLine(), out yeniYazarId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Yayın Yılı: ");
                    int yeniYayinYili;
                    while (!int.TryParse(Console.ReadLine(), out yeniYayinYili))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni ISBN: ");
                    string yeniIsbn = Console.ReadLine() ?? string.Empty;
                    Kitaplar guncelKitap = new Kitaplar
                    {
                        KitapId = kitapId,
                        Baslik = yeniBaslik,
                        YazarID = yeniYazarId,
                        YayinYili = yeniYayinYili,
                        İSBN = yeniIsbn
                    };
                    int guncelleSonuc = KitapGuncelle(guncelKitap);
                    if (guncelleSonuc > 0)
                    {
                        Console.WriteLine("Kitap başarıyla güncellendi.");
                    }
                    else
                    {
                        Console.WriteLine("Kitap güncellenirken bir hata oluştu.");
                    }
                    break;
                case "3":
                    // Kitap silme işlemi
                    Console.Write("Silinecek Kitap ID: ");
                    int silinecekKitapId;
                    while (!int.TryParse(Console.ReadLine(), out silinecekKitapId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    int silSonuc = KitapSil(silinecekKitapId);
                    if (silSonuc > 0)
                    {
                        Console.WriteLine("Kitap başarıyla silindi.");
                    }
                    else
                    {
                        Console.WriteLine("Kitap silinirken bir hata oluştu.");
                    }
                    break;
                case "4":
                    // Kitapları listeleme işlemi
                    List<Kitaplar> kitaplar = KitaplariListele();
                    Console.WriteLine("Kitap Listesi:");
                    foreach (var kitap in kitaplar)
                    {
                        Console.WriteLine($"ID: {kitap.KitapId}, Başlık: {kitap.Baslik}, Yazar ID: {kitap.YazarID}, Yayın Yılı: {kitap.YayinYili}, ISBN: {kitap.İSBN}");
                    }
                    if (kitaplar.Count == 0)
                    {
                        Console.WriteLine("Listelemede hata oluştu.");
                    }
                    else
                    {
                        Console.WriteLine("Kitaplar başarıyla listelendi.");
                    }
                    Console.WriteLine("Devam etmek için bir tuşa basın...");
                    Console.ReadKey();
                    Console.Clear();
                    KitapIslemleri();
                    break;
                case "5":
                    // Ana menüye dön
                    Console.Clear();
                    Console.WriteLine("Ana Menüye dönülüyor...");
                    break;
                default:
                    Console.WriteLine("Geçersiz seçim.");
                    break;
            }
        }
        readonly DB _dB;
        public KitapService()
        {
            _dB = new DB();
        }
        // Kitap ekleme
        public int KitapEkle (Kitaplar kitap)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Kitaplar (Baslik, YazarID, YayinYili, İSBN) VALUES (@Baslik, @YazarID, @YayinYili, @İSBN)";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Baslik", kitap.Baslik);
                command.Parameters.AddWithValue("@YazarID", kitap.YazarID);
                command.Parameters.AddWithValue("@YayinYili", kitap.YayinYili);
                command.Parameters.AddWithValue("@İSBN", kitap.İSBN);

                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection(_dB.GetConnection());
            }
            return result;
        }
        // Kitap Güncelleme

        public int KitapGuncelle(Kitaplar kitap)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Kitaplar SET Baslik = @Baslik, YazarID = @YazarID, YayinYili = @YayinYili, İSBN = @İSBN WHERE KitapId = @KitapId";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@KitapId", kitap.KitapId);
                command.Parameters.AddWithValue("@Baslik", kitap.Baslik);
                command.Parameters.AddWithValue("@YazarID", kitap.YazarID);
                command.Parameters.AddWithValue("@YayinYili", kitap.YayinYili);
                command.Parameters.AddWithValue("@İSBN", kitap.İSBN);

                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection(_dB.GetConnection());
            }
            return result;
        }
        // Kitap Silme
        public int KitapSil(int id)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Kitaplar WHERE KitapId = @KitapId";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@KitapId", id);
                result = command.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection(_dB.GetConnection());
            }
            return result;
        } 
        // Kitapları Listeleme
        public List<Kitaplar> KitaplariListele()
        {
            List<Kitaplar> kitaplar = new List<Kitaplar>();
            try
            {
                string query = "SELECT * FROM Kitaplar";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Kitaplar kitap = new Kitaplar
                    {
                        KitapId = reader.GetInt32(0),
                        Baslik = reader.GetString(1),
                        YazarID = reader.GetInt32(2),
                        YayinYili = reader.GetInt32(3),
                        İSBN = reader.GetString(4)
                    };
                    kitaplar.Add(kitap);
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection(_dB.GetConnection());
            }
            return kitaplar;
        }
    }

}