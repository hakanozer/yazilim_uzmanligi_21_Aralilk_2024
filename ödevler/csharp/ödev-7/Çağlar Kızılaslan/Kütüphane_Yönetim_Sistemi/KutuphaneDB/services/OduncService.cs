using System.Data;
using Microsoft.Data.SqlClient;
using System.Data.SqlTypes;
using KutuphaneDB.Models;


namespace KutuphaneDB.Services
{
    public class OduncService
    {
        public void OduncIslemleri()
        {
            Console.WriteLine("Ödünç İşlemleri");
            Console.WriteLine("1. Ödünç Ekle");
            Console.WriteLine("2. Ödünç Güncelle");
            Console.WriteLine("3. Ödünç Sil");
            Console.WriteLine("4. Ödünçleri Listele");
            Console.WriteLine("5. Ana Menüye Dön");
            Console.Write("Seçiminiz: ");
            string secim = Console.ReadLine() ?? string.Empty;
            switch (secim)
            {
                case "1":
                    // Ödünç ekleme işlemi
                    Console.Write("Kitap ID: ");
                    int kitapID;
                    while (!int.TryParse(Console.ReadLine(), out kitapID))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Üye ID: ");
                    int uyeID;
                    while (!int.TryParse(Console.ReadLine(), out uyeID))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Ödünç Alma Tarihi (yyyy-MM-dd): ");
                    DateTime oduncAlmaTarihi;
                    while (!DateTime.TryParse(Console.ReadLine(), out oduncAlmaTarihi))
                    {
                        Console.Write("Geçersiz tarih. Lütfen tekrar girin: ");
                    }
                    Console.Write("İade Tarihi (yyyy-MM-dd): ");
                    DateTime? iadeTarihi = null;
                    string iadeTarihiInput = Console.ReadLine() ?? string.Empty;
                    if (!string.IsNullOrEmpty(iadeTarihiInput))
                    {
                        while (!DateTime.TryParse(iadeTarihiInput, out DateTime tempIadeTarihi))
                        {
                            Console.Write("Geçersiz tarih. Lütfen tekrar girin: ");
                            iadeTarihiInput = Console.ReadLine() ?? string.Empty;
                        }
                        iadeTarihi = DateTime.Parse(iadeTarihiInput);
                    }
                    Oduncler yeniOdunc = new Oduncler
                    {
                        
                        KitapID = kitapID,
                        UyeID = uyeID,
                        OduncAlmaTarihi = oduncAlmaTarihi,
                        IadeTarihi = iadeTarihi
                    };
                    int ekleSonuc = OduncEkle(yeniOdunc);
                    if (ekleSonuc > 0)
                    {
                        Console.WriteLine("Ödünç başarıyla eklendi.");
                    }
                    else
                    {
                        Console.WriteLine("Ödünç eklenirken bir hata oluştu.");
                    }
                    break;
                case "2":
                    // Ödünç güncelleme işlemi
                    Console.Write("Güncellenecek Ödünç ID: ");
                    int guncelOduncID;
                    while (!int.TryParse(Console.ReadLine(), out guncelOduncID))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Kitap ID: ");
                    int yeniKitapID;
                    while (!int.TryParse(Console.ReadLine(), out yeniKitapID))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Üye ID: ");
                    int yeniUyeID;
                    while (!int.TryParse(Console.ReadLine(), out yeniUyeID))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    Console.Write("Yeni Ödünç Alma Tarihi (yyyy-MM-dd): ");
                    DateTime yeniOduncAlmaTarihi;
                    while (!DateTime.TryParse(Console.ReadLine(), out yeniOduncAlmaTarihi))
                    {
                        Console.Write("Geçersiz tarih. Lütfen tekrar girin: ");
                    }
                    Console.Write("Yeni İade Tarihi (yyyy-MM-dd): ");
                    DateTime? yeniIadeTarihi = null;
                    string yeniIadeTarihiInput = Console.ReadLine() ?? string.Empty;
                    if (!string.IsNullOrEmpty(yeniIadeTarihiInput))
                    {
                        while (!DateTime.TryParse(yeniIadeTarihiInput, out DateTime tempYeniIadeTarihi))
                        {
                            Console.Write("Geçersiz tarih. Lütfen tekrar girin: ");
                            yeniIadeTarihiInput = Console.ReadLine() ?? string.Empty;
                        }
                        yeniIadeTarihi = DateTime.Parse(yeniIadeTarihiInput);
                    }
                    Oduncler guncelOdunc = new Oduncler
                    {
                        OduncID = guncelOduncID,
                        KitapID = yeniKitapID,
                        UyeID = yeniUyeID,
                        OduncAlmaTarihi = yeniOduncAlmaTarihi,
                        IadeTarihi = yeniIadeTarihi
                    };
                    int guncelleSonuc = OduncGuncelle(guncelOdunc);
                    if (guncelleSonuc > 0)
                    {
                        Console.WriteLine("Ödünç başarıyla güncellendi.");
                    }
                    else
                    {
                        Console.WriteLine("Ödünç güncellenirken bir hata oluştu.");
                    }
                    break;
                case "3":
                    // Ödünç silme işlemi
                    Console.Write("Silinecek Ödünç ID: ");
                    int silinecekOduncID;
                    while (!int.TryParse(Console.ReadLine(), out silinecekOduncID))
                    {
                        Console.Write("Geçersiz giriş. Lütfen bir sayı girin: ");
                    }
                    int silSonuc = OduncSil(silinecekOduncID);
                    if (silSonuc > 0)
                    {
                        Console.WriteLine("Ödünç başarıyla silindi.");
                    }
                    else
                    {
                        Console.WriteLine("Ödünç silinirken bir hata oluştu.");
                    }
                    break;
                case "4":
                    // Ödünçleri listeleme işlemi
                    List<Oduncler> oduncList = OduncListele();
                    Console.WriteLine("Ödünç Listesi:");
                    foreach (var odunc in oduncList)
                    {
                        Console.WriteLine($"ID: {odunc.OduncID}, Kitap ID: {odunc.KitapID}, Üye ID: {odunc.UyeID}, Ödünç Alma Tarihi: {odunc.OduncAlmaTarihi.ToShortDateString()}, İade Tarihi: {(odunc.IadeTarihi.HasValue ? odunc.IadeTarihi.Value.ToShortDateString() : "Henüz İade Edilmedi")}");
                    }
                    if (oduncList.Count == 0)
                    {
                        Console.WriteLine("Ödünç listesi boş.");
                    }
                    Console.WriteLine("Devam etmek için bir tuşa basın...");
                    Console.ReadKey();
                    Console.Clear();
                    break;
                case "5":
                    // Ana menüye dön
                    Console.WriteLine("Ana menüye dönülüyor...");
                    break;
                default:
                    Console.WriteLine("Geçersiz seçim.");
                    break;
            }
        }
        readonly DB _dB;
        public OduncService()
        {
            _dB = new DB();
        }
        // Odunc Ekleme
        public int OduncEkle(Oduncler oduncler)
        {
            int result = 0;
            try
            {
                string query = "INSERT INTO Oduncler (KitapID, UyeID, OduncTarihi,IadeTarihi) VALUES (@KitapID,@UyeID, @OduncTarihi, @IadeTarihi)";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@KitapID", oduncler.KitapID);
                command.Parameters.AddWithValue("@UyeID", oduncler.UyeID);
                command.Parameters.AddWithValue("@OduncTarihi", oduncler.OduncAlmaTarihi);

                // Eğer null ise, DBNull gönder
                if (oduncler.IadeTarihi.HasValue)
                    command.Parameters.AddWithValue("@IadeTarihi", oduncler.IadeTarihi.Value);
                else
                    command.Parameters.AddWithValue("@IadeTarihi", DBNull.Value);

                    result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // Handle exception (optional logging)
                Console.WriteLine($"Error: {ex.Message}");
            }
            return result;
        }
        // Odunc Güncelleme
        public int OduncGuncelle(Oduncler oduncler)
        {
            int result = 0;
            try
            {
                string query = "UPDATE Oduncler SET KitapID = @KitapID, UyeID = @UyeID WHERE OduncID = @OduncID";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@OduncID", oduncler.OduncID);
                command.Parameters.AddWithValue("@KitapID", oduncler.KitapID);
                command.Parameters.AddWithValue("@UyeID", oduncler.UyeID);

                result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // Handle exception (optional logging)
                Console.WriteLine($"Error: {ex.Message}");
            }
            return result;
        }
        // Odunc Silme
        public int OduncSil(int oduncID)
        {
            int result = 0;
            try
            {
                string query = "DELETE FROM Oduncler WHERE OduncID = @OduncID";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                command.Parameters.AddWithValue("@OduncID", oduncID);

                result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Error: {ex.Message}");
            }
            return result;
        }
        // Odunc Listeleme
        public List<Oduncler> OduncListele()
        {
            List<Oduncler> oduncList = new List<Oduncler>();
            try
            {
                string query = "SELECT * FROM Oduncler";
                SqlCommand command = new SqlCommand(query, _dB.GetConnection());
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Oduncler odunc = new Oduncler
                    {
                        OduncID = reader.GetInt32(0),
                        KitapID = reader.GetInt32(1),
                        UyeID = reader.GetInt32(2),
                        OduncAlmaTarihi = reader.GetDateTime(3),
                        IadeTarihi = reader.IsDBNull(4) ? (DateTime?)null : reader.GetDateTime(4)
                    };
                    oduncList.Add(odunc);
                }
            }
            catch (Exception ex)
            {
                // Handle exception (optional logging)
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                _dB.CloseConnection(_dB.GetConnection());
            }
            if (oduncList.Count == 0)
            {
                Console.WriteLine("Ödünç listesi boş.");
            }
            else
            {
                Console.WriteLine("Ödünç listesi başarıyla alındı.");
            }
            Console.WriteLine("Devam etmek için bir tuşa basın...");
            Console.ReadKey();
            Console.Clear();
            // Return the list of Oduncler3
            return oduncList;
        }

    }
}