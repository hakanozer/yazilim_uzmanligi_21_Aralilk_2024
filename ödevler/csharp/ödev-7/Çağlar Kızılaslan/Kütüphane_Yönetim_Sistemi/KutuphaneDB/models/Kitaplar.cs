public class Kitaplar
{
    public int KitapId { get; set; }
    public string Baslik { get; set; } = string.Empty;
    public int YazarID { get; set; }
    public int YayinYili { get; set; }
    public string İSBN { get; set; } = string.Empty;

    public Kitaplar() { }

    public Kitaplar(int kitapId, string baslik, int yazarID, int yayinYili, string isbn)
    {
        KitapId = kitapId;
        Baslik = baslik;
        YazarID = yazarID;
        YayinYili = yayinYili;
        İSBN = isbn;
    }
}