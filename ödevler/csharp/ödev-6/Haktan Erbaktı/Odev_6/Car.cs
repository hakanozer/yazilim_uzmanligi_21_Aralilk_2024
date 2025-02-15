using System;



namespace Odev_06
{
    public class Car : Vehicle, IVehicle, IMovable
    {

        public override double FuelEfficiency { get; set; } = 1.0;

        public void StartEngine()
        {
            Console.WriteLine("Arabanın motoru çalışmaya başladı");
        }
        public void StopEngine()
        {
            Console.WriteLine("Arabanın motoru durdu");
        }

        public void Move()
        {
            Console.WriteLine("Araba hareket ediyor.");
        }

        
    }
}


