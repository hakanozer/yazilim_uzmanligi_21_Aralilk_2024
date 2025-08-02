using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Bike : IVehicle
    {
        public string StartEngine()
        {
            return "Bike engine started";
        }

        public string StopEngine()
        {
            return "Bike engine stopped";
        }
    }
}
