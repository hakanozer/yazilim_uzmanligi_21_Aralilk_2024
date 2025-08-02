using System;

namespace Odev_06
{
    public class WashingMachine : Appliance
    {
        public override void TurnOn()
        {
            Console.WriteLine("Çamaşır makinesi çalıştırılıyor.");
        }

        public override void TurnOff()
        {
            Console.WriteLine("Çamaşır makinesi kapatılıyor.");
        }
    }
}
