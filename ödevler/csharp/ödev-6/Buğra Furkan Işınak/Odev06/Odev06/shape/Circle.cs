using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev06.shape
{
    public class Circle : IShape
    {
        public override void CalculateArea()
        {
            Console.WriteLine("Circle Call");
        }
    }
}
