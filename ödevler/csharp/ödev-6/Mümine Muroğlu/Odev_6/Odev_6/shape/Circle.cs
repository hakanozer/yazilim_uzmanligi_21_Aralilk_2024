using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.shape
{
    public class Circle : Shape ,IShape
    {
        public override int CalculateArea()
        {
            throw new NotImplementedException();
        }

        public void Draw()
        {
            Console.WriteLine("Circle Drawn.");
        }
    }
}
