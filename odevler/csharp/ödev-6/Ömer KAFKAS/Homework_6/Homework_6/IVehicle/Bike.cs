using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.IVehicle
{
    class Bike : IVehicle
    {
        public void StartEngine()
        { Console.WriteLine("Bisiklet Çalıştı."); }
        public void StopEngine()
        { Console.WriteLine("Bisiklet Çalışmayı Durdurdu."); }
    }
}
