using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.Vehicle
{
    public class Truck : Vehicle
    {
        private double fuelEfficiency;

        public override double FuelEfficiency
        {
            get { return fuelEfficiency; }
            set { fuelEfficiency = value; }
        }
    }
}