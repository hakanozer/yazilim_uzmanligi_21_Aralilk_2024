using System;
using System.Collections.Generic;
using System.Data;
using KutuphaneDB.Models;
using Microsoft.Data.SqlClient;

namespace KutuphaneDB.Services
{
    public class UyeService
    {
        readonly DB _dB;
        
        public UyeService()
        {
            _dB = new DB();
        }

        public void UyeIslemleri()
        {
            Console.WriteLine("Üye İşlemleri");
            Console.WriteLine("1. Üye Ekle");
            Console.WriteLine("2. Üye Güncelle");
            Console.WriteLine("3. Üye Sil");
            Console.WriteLine("4. Üyeleri Listele");
            Console.WriteLine("5. Ana Menüye Dön");
            Console.Write("Seçiminiz: ");
            string secim = Console.ReadLine() ?? string.Empty;
            
            switch (secim)
            {
                case "1":
                    // Üye ekleme işlemi
                    Console.Write("Üye Adı: ");
                    string ad = Console.ReadLine() ?? string.Empty;
                    Console.Write("Üye Soyadı: ");
                    string soyad = Console.ReadLine() ?? string.Empty;
                    Console.Write("Üye E-posta: ");
                    string mail = Console.ReadLine() ?? string.Empty;
                    Console.Write("Üye Telefon: ");
                    string telefon = Console.ReadLine() ?? string.Empty;

                    Uyeler yeniUye = new Uyeler
                    {
                        Ad = ad,
                        Soyad = soyad,
                        Mail = mail,
                        Telefon = telefon
                    };
                    
                    int ekleSonuc = UyeEkle(yeniUye);
                    if (ekleSonuc > 0)
                    {
                        Console.WriteLine("Üye başarıyla eklendi.");
                    }
                    else
                    {
                        Console.WriteLine("Üye eklenirken bir hata oluştu.");
                    }
                    break;

                case "2":
                    // Üye güncelleme işlemi
                    Console.Write("Güncellenecek Üye ID: ");
                    int uyeId;
                    while (!int.TryParse(Console.ReadLine(), out uyeId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Üye Adı: ");
                    string yeniAd = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yeni Üye Soyadı: ");
                    string yeniSoyad = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yeni Üye E-posta: ");
                    string yeniMail = Console.ReadLine() ?? string.Empty;
                    Console.Write("Yeni Üye Telefon: ");
                    string yeniTelefon = Console.ReadLine() ?? string.Empty;

                    Uyeler guncelUye = new Uyeler
                    {
                        Id = uyeId,
                        Ad = yeniAd,
                        Soyad = yeniSoyad,
                        Mail = yeniMail,
                        Telefon = yeniTelefon
                    };
                    
                    int guncelleSonuc = UyeGuncelle(guncelUye);
                    if (guncelleSonuc > 0)
                    {
                        Console.WriteLine("Üye başarıyla güncellendi.");
                    }
                    else
                    {
                        Console.WriteLine("Üye güncellenirken bir hata oluştu.");
                    }
                    break;

                case "3":
                    // Üye silme işlemi
                    Console.Write("Silinecek Üye ID: ");
                    int silinecekUyeId;
                    while (!int.TryParse(Console.ReadLine(), out silinecekUyeId))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }

                    int silSonuc = UyeSil(silinecekUyeId);
                    if (silSonuc > 0)
                    {
                        Console.WriteLine("Üye başarıyla silindi.");
                    }
                    else
                    {
                        Console.WriteLine("Üye silinirken bir hata oluştu.");
                    }
                    break;

                case "4":
                    // Üyeleri listeleme işlemi
                    List<Uyeler> uyeler = UyeListele();
                    Console.WriteLine("Üye Listesi:");
                    foreach (var uye in uyeler)
                    {
                        Console.WriteLine($"ID: {uye.Id}, Ad: {uye.Ad}, Soyad: {uye.Soyad}, E-posta: {uye.Mail}, Telefon: {uye.Telefon}, Kayıt Tarihi: {uye.KayitTarihi}");
                    }
                    if (uyeler.Count == 0)
                    {
                        Console.WriteLine("Üye bulunamadı.");
                    }
                    break;

                case "5":
                    // Ana menüye dön
                    Console.Clear();
                    Console.WriteLine("Ana Menüye Dönülüyor...");
                    break;

                default:
                    Console.WriteLine("Geçersiz seçim.");
                    break;
            }
        }

        // Üye Ekleme
        public int UyeEkle(Uyeler uye)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Uyeler (Ad, Soyad, Mail, Telefon) VALUES (@Ad, @Soyad, @Mail, @Telefon)";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Ad", uye.Ad);
                command.Parameters.AddWithValue("@Soyad", uye.Soyad);
                command.Parameters.AddWithValue("@Mail", uye.Mail);
                command.Parameters.AddWithValue("@Telefon", uye.Telefon);
                
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

        // Üye Güncelleme
        public int UyeGuncelle(Uyeler uye)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Uyeler SET Ad = @Ad, Soyad = @Soyad, Mail = @Mail, Telefon = @Telefon WHERE UyeID = @UyeID";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@Ad", uye.Ad);
                command.Parameters.AddWithValue("@Soyad", uye.Soyad);
                command.Parameters.AddWithValue("@Mail", uye.Mail);
                command.Parameters.AddWithValue("@Telefon", uye.Telefon);
                command.Parameters.AddWithValue("@UyeID", uye.Id);
                
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

        // Üye Silme
        public int UyeSil(int id)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Uyeler WHERE UyeID = @UyeID";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@UyeID", id);
                
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

        // Üyeleri Listeleme
        public List<Uyeler> UyeListele()
        {
            List<Uyeler> uyeler = new List<Uyeler>();
            try
            {
                string query = "SELECT UyeID, Ad, Soyad, Mail, Telefon, KayitTarihi FROM Uyeler";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    uyeler.Add(new Uyeler
                    {
                        Id = reader.GetInt32(0),
                        Ad = reader.GetString(1),
                        Soyad = reader.GetString(2),
                        Mail = reader.GetString(3),
                        Telefon = reader.GetString(4),
                        KayitTarihi = reader.GetDateTime(5) // KayitTarihi'ni veritabanından alıyoruz
                    });
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
            return uyeler;
        }
    }
}
