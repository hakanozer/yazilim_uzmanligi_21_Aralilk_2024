using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Shapes
{
    public class Rectangle : Shape
    {
        public int w;
        public int h;

        // Yapıcı metod
        public Rectangle(int width, int height)
        {
            w = width;
            h = height;
        }

        // CalculateArea metodunu override ediyoruz.
        public override double CalculateArea()
        {
            return w * h; 
        }
    }
}
