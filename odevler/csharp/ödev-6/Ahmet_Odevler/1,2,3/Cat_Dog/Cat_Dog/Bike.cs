using static Cat_Dog.IVehicle;

namespace Cat_Dog
{
class Bike : IVehicle
    {
        public void Start()
        {
            Console.WriteLine("Bike is starting...");
        }

        public void Stop()
        {
            Console.WriteLine("Bike has stopped.");
        }
    }
}