using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Shapes
{
    public class Circle1 : Shape
    {

        public double r { get; set; }

        
        public Circle1(double radius)
        {
            r = radius;
        }

        public override double CalculateArea()
        {
            return Math.PI * r * r; 
        }
    }
}
