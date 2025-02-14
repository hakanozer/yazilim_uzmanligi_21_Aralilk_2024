using static Cat_Dog.Animal;

namespace Cat_Dog
{
class Cat : Animal
    {
        public override void MakeSound()  // Abstract metodu override ettik
        {
            Console.WriteLine("Meow Meow!");  // Kedi sesi çıkarıyor
        }
    }
}