using System;

namespace Odev_06
{
    public class Bike : IVehicle
    {
        public void StartEngine()
        {
            Console.WriteLine("Bisiklet motoru çalışmaya başladı");
        }
        public void StopEngine()
        {
            Console.WriteLine("Bisiklet motoru durdu");
        }
    }
}
