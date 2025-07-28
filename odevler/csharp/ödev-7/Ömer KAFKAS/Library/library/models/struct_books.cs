namespace library.Models
{
    public struct Books
    {
        public int Books_ID { get; set; }
        public int Writers_ID { get; set; }
        public string Title { get; set; }
        public int Publication_Year { get; set; }
        public string ISBN { get; set; } 

        public Books(int books_id, int writers_id, string title, int publication_year, string ISBN)
        {
            Books_ID = books_id;
            Writers_ID = writers_id;
            Title = title;
            Publication_Year = publication_year;
            this.ISBN = ISBN; 
        }
    }
}