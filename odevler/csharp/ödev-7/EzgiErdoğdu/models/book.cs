namespace LibraryManagementSystem.Models
{
    public struct Book
    {
        public int bid { get; set; }
        public string? bookname { get; set; }
        public int aid { get; set; }
        public DateTime year { get; set; }
        public string isbn { get; set; }

        public Book(int bid, string bookname, int aid, DateTime year, string isbn)
        {
            this.bid = bid;
            this.bookname = bookname;
            this.aid = aid;
            this.year = year;
            this.isbn = isbn;
        }
    }
}
