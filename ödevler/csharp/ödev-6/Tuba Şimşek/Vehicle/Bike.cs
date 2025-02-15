namespace Odev_6.Vehicle
{
    public class Bike : IVehicle
    {
        public void StartEngine()
        {
            Console.WriteLine("Bisiklet motoru çalıştırıldı.");
        }

        public void StopEngine()
        {
            Console.WriteLine("Bisiklet motoru durduruldu.");
        }
    }
}
