using System;

namespace Odev_06
{
    public class Refrigerator : Appliance
    {
        public override void TurnOn()
        {
            Console.WriteLine("Buzdolabı çalıştırılıyor...");
        }

        public override void TurnOff()
        {
            Console.WriteLine("Buzdolabı kapatılıyor...");
        }
    }
}
