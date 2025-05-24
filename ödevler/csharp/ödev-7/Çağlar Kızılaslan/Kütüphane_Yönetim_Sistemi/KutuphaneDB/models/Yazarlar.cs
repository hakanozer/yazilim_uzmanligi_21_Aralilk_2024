namespace KutuphaneDB.Models
{
    public class Yazarlar
    {
        public int YazarID { get; set; }
        public string Ad { get; set; } = string.Empty;
        public string Soyad { get; set; } = string.Empty;

        public Yazarlar() { }

        public Yazarlar(int yazarID, string ad, string soyad)
        {
            YazarID = yazarID;
            Ad = ad;
            Soyad = soyad;
        }
    }
}