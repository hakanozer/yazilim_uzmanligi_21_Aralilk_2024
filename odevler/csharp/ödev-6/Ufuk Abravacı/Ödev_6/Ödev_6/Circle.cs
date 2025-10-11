using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Circle : Shape, IShape
    {
        public int radius;
        public Circle(int radius)
        {
            this.radius = radius;
        }
        public override int CalculateArea()
        {
            return (int)(Math.PI * Math.Pow(radius, 2));
        }

        public string Draw()
        {
            return "Cirle Drawed.";
        }
    }
}
