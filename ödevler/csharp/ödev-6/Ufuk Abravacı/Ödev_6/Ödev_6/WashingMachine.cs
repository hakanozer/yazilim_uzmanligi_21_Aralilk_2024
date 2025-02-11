using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class WashingMachine : Appliance
    {
        public override string TurnOff()
        {
            return "Washing Machine Turned Off";
        }

        public override string TurnOn()
        {
            return "Washing Machine Turned On";
        }
    }
}
