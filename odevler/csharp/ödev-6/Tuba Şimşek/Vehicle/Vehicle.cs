using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Vehicle
{

    /*10.B%r Veh%cle sınıfı oluşturun ve bu sınıftan türeyen Car ve Truck sınıflarını
       yazın. Veh%cle sınıfında b%r FuelEV%c%ency özell%ğ% tanımlayın ve bu özell%ğ% türeyen
       sınıflarda farklı şek%lde hesaplayın.*/

    public abstract class Vehicle
    {
        public string Marka { get; set; }
        public double FuelConsumption { get; set; }
        public Vehicle(string marka, double fuelConsumption)
        {

            Marka = marka;
            FuelConsumption = fuelConsumption;

        }
        public abstract double FuelEfficiency();//yakıt verimliliği
    }
}
