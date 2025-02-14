using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Rectangle : Shape
    {
        private int _length,_width;
        public Rectangle(int length, int width)
        {
            _length = length;
            _width = width;
        }

        public override int CalculateArea()
        {
            return _length * _width;
        }
    }
}
