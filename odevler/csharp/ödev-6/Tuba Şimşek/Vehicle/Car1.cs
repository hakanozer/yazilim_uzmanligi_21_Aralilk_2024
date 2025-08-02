using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Vehicle
{
    public class Car1 : Vehicle
    {
        public Car1(string marka, double fuelConsumption)
            : base(marka, fuelConsumption) { }

        public override double FuelEfficiency()
        {
           return 100 / FuelConsumption; 
        }
    }
}
