using System;

namespace Odev_06
{
    public class Book
    {
        
        public string Title { get; }

        
        public string Author { get; set; }

        public Book(string title, string author)
        {
            Title = title;
            Author = author;
        }

    }
}
