using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Appliances
{
    public class WashingMachine : Appliance
    {
        public override string TurnOff()
        {
            return "WashingMachine Turn OFF." ;
        }

        public override string TurnOn()
        {
            return "WashingMachine Turn On. ";
        }
    }
}
