using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.IShape
{
    public class Square : IShape
    {
        void IShape.Draw()
        {
            Console.WriteLine("Kare Çizildi.");
        }
    }
}
