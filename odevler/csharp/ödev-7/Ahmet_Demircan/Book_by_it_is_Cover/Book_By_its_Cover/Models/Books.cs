namespace Book_By_its_Cover.Models
{
    public class Books
    {
        public int BookID { get; set; }
        public string? B_Name { get; set; }
        public int? AuthorID { get; set; }
        public string? AuthorFullName { get; set; }
        public int? ISBN { get; set; }
        public int publishTime { get; set; }
    }
}