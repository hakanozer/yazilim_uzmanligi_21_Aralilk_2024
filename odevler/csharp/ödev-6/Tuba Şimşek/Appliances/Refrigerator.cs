using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Appliances
{
    public class Refrigerator : Appliance
    {
        public override string TurnOff()
        {
            return "Refrigator Turn Off";
        }

        public override string TurnOn()
        {
           return "Refrigator Turn On";
        }
    }
}
