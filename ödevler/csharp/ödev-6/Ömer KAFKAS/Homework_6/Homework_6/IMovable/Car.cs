using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.IMovable
{
    public class Car : IMovable
    {
        public void Move()
        { Console.WriteLine("Araç Hareket Etti."); }
    }
}
