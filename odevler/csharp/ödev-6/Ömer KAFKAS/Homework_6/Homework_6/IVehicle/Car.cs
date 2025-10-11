using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.IVehicle
{
    public class Car : IVehicle
    {
        public void StartEngine()
        { Console.WriteLine("Araba Çalıştı."); }
        public void StopEngine() 
        { Console.WriteLine("Araba Çalışmayı Durdurdu."); }
    }
}
