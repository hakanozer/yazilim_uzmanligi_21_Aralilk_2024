using System;

namespace Odev_06
{
    public class Circle : Shape, IShape
    {
        public double Radius { get; set; }

        public Circle(double radius)
        {
            Radius = radius;
        }

        public override double CalculateArea()
        {
            return Math.PI * Radius * Radius;
        }

        public void Draw()
        {
            Console.WriteLine("Daire çiziliyor.");
        }
    }
}
