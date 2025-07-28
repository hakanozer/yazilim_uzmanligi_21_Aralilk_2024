using Odev_06;

namespace Odev_6
{

    public class Program
    {
        public static void Main(string[] args)
        {
            //Q1
            Animal animal = new Animal();
            Dog dog = new Dog();
            Cat cat = new Cat();

            animal.MakeSound();
            dog.MakeSound();
            cat.MakeSound();

            //Q2
            IVehicle car = new Car();
            IVehicle bike = new Bike();

            car.StartEngine();
            car.StopEngine();

            bike.StartEngine();
            bike.StopEngine();

            //Q3
            Shape circle = new Circle(4);
            Shape rectangle = new Rectangle(1,2);

            Console.WriteLine("Dairenin alanı: " + circle.CalculateArea()); 
            Console.WriteLine("Dikdörtgenin alanı: " + rectangle.CalculateArea());

            //Q4
            Person person = new Person("Ayşe", 30);

            Console.WriteLine("Adı: " + person.Name); 
            Console.WriteLine("Yaşı: " + person.Age);

            //Q5
            Employee employee = new Employee(5000);

            Console.WriteLine("Maaşı: " + employee.Salary);

            //Q7
            Appliance washingMachine = new WashingMachine();
            Appliance refrigerator = new Refrigerator();

            Console.WriteLine("Çamaşır makinesi:");
            washingMachine.TurnOn(); 
            washingMachine.TurnOff(); 

            Console.WriteLine("Buzdolabı:");
            refrigerator.TurnOn(); 
            refrigerator.TurnOff();

            //Q8
            Book book = new Book("Suç ve Ceza", "Fyodor Dostoyevski");

            Console.WriteLine("Kitap Adı: " + book.Title);
            Console.WriteLine("Yazar: " + book.Author);

            


        }
    }


}
