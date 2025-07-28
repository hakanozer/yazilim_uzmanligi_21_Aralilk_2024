namespace Odev_6.AnimalShelter
{
    public class Dog : Animals
    {
        public override string Name()
        {
            return "Dog";
        }

        public override int Age()
        {
            return 3;
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
            return "woof woof...";
        }
    }
}
