using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6
{

    /*8. B%r Book sınıfı oluşturun ve bu sınıfta T%tle ve Author özell%kler%n%
        tanımlayın. T%tle özell%ğ% sadece okunab%l%r, Author özell%ğ% %se hem okunab%l%r hem
        de yazılab%l%r olsun.*/
    public class Book
    { 
        public string? Title { get; }
        public string? Author { get; set; }

        public Book(string title, string author)
        {
            Title = title;
            Author = author;
        }

    }
}
