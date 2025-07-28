namespace LibraryManagementSystem.Models
{
    public struct OduncSayisi
    {
public string? bookname { get; set; }
public int oduncsayisi { get; set; }

        public OduncSayisi(string bookname, int oduncsayisi)
        {
            this.bookname = bookname;
            this.oduncsayisi = oduncsayisi;
        }
    }
}
