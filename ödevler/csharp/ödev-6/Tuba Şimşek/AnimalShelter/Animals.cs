/*1.Bir Animal sınıfı oluşturun ve bu sınıftan türeyen Dog ve Cat sınıflarını
yazın.Animal sınıfında bir MakeSound metodu tanımlayın
ve Dog ve Cat sınıflarında bu metodu override edin.*/

namespace Odev_6.AnimalShelter
{
    public abstract class Animals
    {
        public abstract string Name();
        public abstract int Age();
        public abstract string Eat();
        public abstract string Health();
        public abstract string MakeSound();


        public void Report()
        {
            Console.WriteLine($"Name:{Name()} - Age:{Age()} - Eat:{Eat()} - Health:{Health()} - Make sound:{MakeSound()}");
        }
        

    }
}
