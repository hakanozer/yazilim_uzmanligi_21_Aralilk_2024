using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev_6.AnimalShelter;
using Odev_6.Appliances;
using Odev_6.Shapes;
using Odev_6.Vehicle;

namespace Odev_6
    {
        public class Program
        {

            public static void Main(string[] args)
            {

            //1

             Cat cat = new Cat();
             Dog dog = new Dog();
             Bird bird = new Bird();

             cat.Report();
             dog.Report();
             bird.Report();


            //2

            Car3 car = new Car3();
            Bike bike = new Bike();

            car.StartEngine();
            car.StopEngine();

            bike.StartEngine();
            bike.StopEngine();


            //3

            Circle1 circle1 = new Circle1(11);
            Rectangle rectangle = new Rectangle(6, 11);


            Console.WriteLine("Dairenin Alanı: " + circle1.CalculateArea());
            Console.WriteLine("Dikdörtgenin Alanı: " + rectangle.CalculateArea());


            //4


            //5

            try
            {
                Employee employee = new Employee("Ali Bil", 50000);
                employee.DisplayInfo();

                // Geçersiz maaş ataması
                employee.Salary = -1000;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }


            //6

            Car3 car3 = new Car3();
            Robot robot = new Robot();

            car3.Move();
            robot.Move();


            //7

            WashingMachine washingMachine = new WashingMachine();
            washingMachine.TurnOn();
            washingMachine.TurnOff();

            Refrigerator refrigerator = new Refrigerator();
            refrigerator.TurnOn();
            refrigerator.TurnOff();

            //8

            Book book = new Book("Sunguroğlu", "Yavuz Bahadıroğlu");
            Console.WriteLine($"Title: {book.Title}, Author: {book.Author}");

            book.Author = "Yavuz Bahadıroğlu";
            Console.WriteLine($"Author: {book.Author}");


            //9

            Circle circle = new Circle();
            Square square = new Square();

            circle.Draw();
            square.Draw();


            //10

            Car1 car1 = new Car1("Togg", 6.5);
            Truck truck = new Truck("Volvo", 30, 10);

            Console.WriteLine($"{car1.Marka} Yakıt Verimliliği: {car1.FuelEfficiency():F2} km/l");
            Console.WriteLine($"{truck.Marka} Yakıt Verimliliği: {truck.FuelEfficiency():F2} km/l");
        

            }  
        }
}



