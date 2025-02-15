using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Vehicle
{
    public class Truck : Vehicle
    {
        public double LoadCapacity { get; set; }//Kamyonun taşıyabileceği yük kapasitesi (ton cinsinden)

        public Truck(string marka, double fuelConsumption, double loadCapacity) : base(marka, fuelConsumption)
        {
            LoadCapacity = loadCapacity;
        }
        public override double FuelEfficiency()
        {
            return (100 / FuelConsumption) * (1 - (LoadCapacity * 0.05)); // Yük arttıkça verim düşer
        }
    }

}
