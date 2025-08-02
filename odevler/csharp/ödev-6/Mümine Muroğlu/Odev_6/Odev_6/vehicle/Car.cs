using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.vehicle
{
    public class Car : IVehicle
    {
        public void StartEngine()
        {
            Console.WriteLine("The car engine started!");
        }

        public void StopEngine()
        {
            Console.WriteLine("The car engine stopped!");
        }
    }
}
