namespace Cat_Dog
{
    public interface IVehicle
    {
        public void Start()
        {
            Console.WriteLine("Working");
        }
        public void Stop()
        {
            Console.Write("Stoped");
        }
    }
}