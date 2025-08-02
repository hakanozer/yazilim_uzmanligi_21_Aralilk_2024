using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.Book
{
    public class Book
    {
        public string Title { get; }
        public string Author 
        {
            get;
            set {throw new NotImplementedException();}
        }
    }
}
