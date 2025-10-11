namespace Odev_6.AnimalShelter
{
    public class Cat : Animals
    {
        public override string Name()
        {
            return "Cat";
        }

        public override int Age()
        {
            return 1;
        }
        public override string Eat()
        {
            return "Wet&Dry Food, Meat";
        }
        public override string Health()
        {
            return "Healthy";
        }
        public override string MakeSound()
        {
            return "meows...";
        }
    }
}
