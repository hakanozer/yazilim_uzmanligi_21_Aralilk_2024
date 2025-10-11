using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev06.Vehicle
{
    public class Bike : IVehicle
    {
        public override void StartEngine()
        {
            Console.WriteLine("Bike Motor Status: Start Engine");
        }

        public override void StopEngine()
        {
            Console.WriteLine("Bike Motor Status: Stop Engine");
        }
    }
}
