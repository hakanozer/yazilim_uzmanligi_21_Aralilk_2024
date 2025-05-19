namespace KutuphaneDB.Models
{
    public class Oduncler
    {
        public int OduncID { get; set; }
        public int KitapID { get; set; }
        public int UyeID { get; set; }
        public DateTime OduncAlmaTarihi { get; set; }
        public DateTime? IadeTarihi { get; set; }
    }
}