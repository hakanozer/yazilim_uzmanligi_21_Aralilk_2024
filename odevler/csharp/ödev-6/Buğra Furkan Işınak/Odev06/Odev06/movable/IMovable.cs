using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev06;

namespace Odev06.movable
{
    public class IMovable
    {
        public virtual void Move()
        {
            Console.WriteLine("Move Calling");
        }
    }
}
