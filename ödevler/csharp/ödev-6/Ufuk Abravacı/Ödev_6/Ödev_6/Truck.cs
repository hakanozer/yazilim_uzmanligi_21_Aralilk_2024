using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Truck : Vehicle
    {
        public double LoadCapacity { get; set; }
        public Truck(int loadCapacity)
        {
            LoadCapacity = loadCapacity;
        }
        public override double FuelEfficiency()
        {
            return 100.0/(LoadCapacity / 1000.0); //Tonla ters orantılı
        }
    }
}
