using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev06;

namespace Odev06.animals
{
    public class Cat : Animals
    {
        public override void MakeSound()
        {
            Console.WriteLine("Cat MakeSound Call");
        }
    }
}
