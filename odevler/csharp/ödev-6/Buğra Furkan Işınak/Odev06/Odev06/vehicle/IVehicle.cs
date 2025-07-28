using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev06.Vehicle
{
    public class IVehicle
    {
        public virtual void StartEngine()
        {
            Console.WriteLine("Start Engine Call");
        }
        public virtual void StopEngine()
        {
            Console.WriteLine("Stop Engine Call");
        }
    }
}
