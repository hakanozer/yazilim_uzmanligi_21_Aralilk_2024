using System.Data;
using Microsoft.Data.SqlClient;
using KutuphaneDB.Models;

namespace KutuphaneDB.Services
{
    public class YazarService
    {
        public void YazarIslemleri()
        {
            Console.WriteLine("Yazar İşlemleri");
            Console.WriteLine("1. Yazar Ekle");
            Console.WriteLine("2. Yazar Güncelle");
            Console.WriteLine("3. Yazar Sil");
            Console.WriteLine("4. Yazarları Listele");
            Console.WriteLine("5. Ana Menüye Dön");
            Console.Write("Seçiminiz: ");
            string secim = Console.ReadLine() ?? string.Empty;
            switch (secim)
            {
                case "1":
                    // Yazar ekleme işlemi
                    Console.Write("Yazar Adı: ");
                    string ad = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yazar Soyadı: ");
                    string soyad = Console.ReadLine() ?? string.Empty;
                    Yazarlar yeniYazar = new Yazarlar
                    {
                        Ad = ad,
                        Soyad = soyad
                    };
                    int ekleSonuc = YazarEkle(yeniYazar);
                    if (ekleSonuc > 0)
                    {
                        Console.WriteLine("Yazar başarıyla eklendi.");
                    }
                    else
                    {
                        Console.WriteLine("Yazar eklenirken bir hata oluştu.");
                    }
                    break;
                case "2":
                    // Yazar güncelleme işlemi
                    Console.Write("Güncellenecek Yazar ID: ");
                    int yazarId;
                    while (!int.TryParse(Console.ReadLine(), out yazarId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Yazar Adı: ");
                    string yeniAd = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yeni Yazar Soyadı: ");
                    string yeniSoyad = Console.ReadLine() ?? string.Empty;
                    Yazarlar guncelYazar = new Yazarlar
                    {
                        YazarID = yazarId,
                        Ad = yeniAd,
                        Soyad = yeniSoyad
                    };
                    int guncelSonuc = YazarGuncelle(guncelYazar);
                    if (guncelSonuc > 0)
                    {
                        Console.WriteLine("Yazar başarıyla güncellendi.");
                    }
                    else
                    {
                        Console.WriteLine("Yazar güncellenirken bir hata oluştu.");
                    }
                    break;
                case "3":
                    // Yazar silme işlemi
                    Console.Write("Silinecek Yazar ID: ");
                    int silinecekYazarId;
                    while (!int.TryParse(Console.ReadLine(), out silinecekYazarId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    int silSonuc = YazarSil(silinecekYazarId);
                    if (silSonuc > 0)
                    {
                        Console.WriteLine("Yazar başarıyla silindi.");
                    }
                    else
                    {
                        Console.WriteLine("Yazar silinirken bir hata oluştu.");
                    }
                    break;
                case "4":
                    // Yazarları listeleme işlemi
                    List<Yazarlar> yazarlar = YazarListele();
                    Console.WriteLine("Yazarlar:");
                    foreach (var yazar in yazarlar)
                    {
                        Console.WriteLine($"ID: {yazar.YazarID}, Ad: {yazar.Ad}, Soyad: {yazar.Soyad}");
                    }
                    if (yazarlar.Count == 0)
                    {
                        Console.WriteLine("Hiç yazar bulunamadı.");
                    }
                    Console.WriteLine("Yazarlar başarıyla listelendi.");
                    break;
                case "5":
                    // Ana menüye dön
                    Console.WriteLine("Ana menüye dönülüyor...");
                    Console.Clear();
                    break;
                default:
                    Console.WriteLine("Geçersiz seçim.");
                    break;
            }
        }
        readonly DB _dB;
        public YazarService()
        {
            _dB = new DB();
        }
        public int YazarEkle(Yazarlar yazar)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Yazarlar (Ad, Soyad) VALUES (@Ad, @Soyad)";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Ad", yazar.Ad);
                command.Parameters.AddWithValue("@Soyad", yazar.Soyad);
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
        public int YazarSil(int YazarID)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Yazarlar WHERE YazarID = @YazarID";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@YazarID", YazarID);
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

        // Yazar Güncelleme
        public int YazarGuncelle(Yazarlar yazar)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Yazarlar SET Ad = @Ad, Soyad = @Soyad WHERE YazarID = @YazarID";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());    
                command.Parameters.AddWithValue("@YazarID", yazar.YazarID);
                command.Parameters.AddWithValue("@Ad", yazar.Ad);
                command.Parameters.AddWithValue("@Soyad", yazar.Soyad);
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
        // Yazarları Listeleme
        public List<Yazarlar> YazarListele()
        {
            List<Yazarlar> yazarlar = new List<Yazarlar>();
            try
            {
                string query = "SELECT * FROM Yazarlar";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    int YazarID = reader.GetInt32(0);
                    string Ad = reader.GetString(1);
                    string Soyad = reader.GetString(2);

                    Yazarlar yazar = new Yazarlar(YazarID, Ad, Soyad);
                    yazarlar.Add(yazar);
                }

            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection(_dB.GetConnection());
            }
            return yazarlar;
        }
        
        
    }
}