using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev06.movable;

namespace Odev06.movable
{
    public class Robot : IMovable
    {
        public override void Move()
        {
            Console.WriteLine("Robot Move Call");
        }
    }
}
