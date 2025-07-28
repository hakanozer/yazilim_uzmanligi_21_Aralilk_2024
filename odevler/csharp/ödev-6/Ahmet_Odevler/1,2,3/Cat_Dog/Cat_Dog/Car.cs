using static Cat_Dog.IVehicle;

namespace Cat_Dog
{
class Car : IVehicle
    {
        public void Start()
        {
            Console.WriteLine("Engine is starting...");
        }

        public void Stop()
        {
            Console.WriteLine("Engine has stopped.");
        }
    }
}