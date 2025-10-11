using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev06.Vehicle
{
    public class Car : IVehicle
    {
        public override void StartEngine()
        {
            Console.WriteLine("Car Motor Status: Start Engine");
        }

        public override void StopEngine()
        {
            Console.WriteLine("Car Motor Status: Stop Engine");
        }
    }
}
