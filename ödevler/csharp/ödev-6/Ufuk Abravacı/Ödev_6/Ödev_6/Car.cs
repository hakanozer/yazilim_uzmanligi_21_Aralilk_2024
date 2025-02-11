using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Car : Vehicle, IVehicle, IMovable
    {
        public int Horsepower { get; set; }
        public Car(int horsepower)
        {
            Horsepower = horsepower;
        }
        public string Move()
        {
            return "Car Moved";
        }

        public string StartEngine()
        {
            return "Car engine started.";
        }

        public string StopEngine()
        {
            return "Car engine stopped.";
        }
        public override double FuelEfficiency()
        {
            return 100.0/Horsepower; //ters orantı
        }
    }
}
