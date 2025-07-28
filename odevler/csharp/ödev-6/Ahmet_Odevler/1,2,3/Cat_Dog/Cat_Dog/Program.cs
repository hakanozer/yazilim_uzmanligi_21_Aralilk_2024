namespace Cat_Dog 
{
    static class Program 
    {
        static void Main(string[] args)  
        {
            Cat myCat = new Cat();
            myCat.ShowMessage();  
            myCat.MakeSound();    

            Dog myDog = new Dog();
            myDog.ShowMessage();
            myDog.MakeSound();

            IVehicle myBike = new Bike();
            myBike.Start();
            myBike.Stop();

            IVehicle myCar = new Car();
            myCar.Start();
            myCar.Stop();

            Shape circle = new Circle(5);
            Console.WriteLine($"Dairenin Alanı: {circle.CalculateArea()}");
            
            Shape rectangle = new Rectangle(4, 6);
            Console.WriteLine($"Dikdörtgenin alanı {rectangle.CalculateArea()}");
        }
    }
}