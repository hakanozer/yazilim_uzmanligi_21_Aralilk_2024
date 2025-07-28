using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Odev06.shape
{
    public class IShape
    {
        public virtual void CalculateArea()
        {
            Console.WriteLine("CalculateArea Call ");
        }
    }
}
