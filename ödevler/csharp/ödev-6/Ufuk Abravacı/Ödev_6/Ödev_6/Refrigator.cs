using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Refrigator : Appliance
    {
        public override string TurnOff()
        {
            return "Refrigator Turned Off";
        }

        public override string TurnOn()
        {
            return "Refrigator Turned On";
        }
    }
}
