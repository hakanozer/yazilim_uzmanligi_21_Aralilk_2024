using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.appliance
{
    public class Refrigerator : Appliance
    {
        public override void TurnOff()
        {
            Console.WriteLine("The refrigator is turned off..");
        }

        public override void TurnOn()
        {
            Console.WriteLine("The refrigator is working..");
        }
    }
}
