using System;
namespace Odev_6.Vehicle
{
    public class Car : IVehicle
    {
        public void StartEngine()
        {
            Console.WriteLine("Araba motoru çalıştırıldı.");
        }

        public void StopEngine()
        {
            Console.WriteLine("Araba motoru durduruldu.");
        }

        
    }
}
