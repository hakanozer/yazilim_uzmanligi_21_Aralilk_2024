namespace Odev_6.AnimalShelter
{
    public class Bird : Animals
    {
        public override string Name()
        {
            return "Bird";
        }

        public override int Age()
        {
            return 4;
        }
        public override string Eat()
        {
            return "Bird seed";
        }
        public override string Health()
        {
            return "Healthy";
        }
        public override string MakeSound()
        {
            return "jcik jcik...";
        }
    }
}
