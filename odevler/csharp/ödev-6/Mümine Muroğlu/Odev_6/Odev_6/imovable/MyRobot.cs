using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.imovable
{
    public class MyRobot : IMovable
    {
        public void Move()
        {
            Console.WriteLine("The robot moved.");
        }
    }
}
