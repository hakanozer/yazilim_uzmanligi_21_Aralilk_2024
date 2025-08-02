using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Appliances
{
    /*7. B%r Appliance soyut sınıfı oluşturun ve bu sınıftan
           türeyen WashingMachine ve Refrigerator sınıflarını yazın. Appliance sınıfında
           b%r TurnOn ve TurnOf metodu tanımlayın ve bu metodları türeyen sınıflarda
           override edin.*/
    public abstract class Appliance
    {
        public abstract string TurnOn();
        public abstract string TurnOff();
    }
}
