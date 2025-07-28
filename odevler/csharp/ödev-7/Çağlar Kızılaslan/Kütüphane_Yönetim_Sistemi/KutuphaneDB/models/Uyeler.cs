namespace KutuphaneDB.Models
{
    public class Uyeler
    {
        public int Id { get; set; }
        public string? Ad { get; set; }
        public string? Soyad { get; set; }
        public string? Mail { get; set; }
        public string? Telefon { get; set; }
        public DateTime KayitTarihi { get; set; }
    }
}