using System;
using Odev06;
using Odev06.animals;
using Odev06.Vehicle;
using Odev06.shape;
using Odev06.user;
using Odev06.customer;
using System.Net.Http.Headers;
using Odev06.movable;


namespace Odev06
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // ODEV6.01

            Dog dog = new Dog();
            Cat cat = new Cat();

            dog.MakeSound();
            cat.MakeSound();

            Console.ReadLine();


            // ODEV6.02

            Car car = new Car();
            Bike bike = new Bike();

            car.StartEngine();
            car.StopEngine();
            bike.StartEngine();
            bike.StopEngine(); 

            Console.ReadLine();


            // ODEV6.03

            Rectangle rectangle = new Rectangle();
            Circle circle = new Circle();

            rectangle.CalculateArea();
            circle.CalculateArea();




            // ODEV6.04
            Console.ReadLine();

            Name name = new Name("Nazif");
            Age age = new Age(22);

            name.UserName();
            age.UserAge(44);


            // ODEV6.05 

            Console.ReadLine();

            Salary pr1 = new Salary();
            pr1.pid = 1;

            Console.WriteLine(pr1.pid);


            // ODEV6.06

            Robot robot = new Robot();
            Cars cars = new Cars();

            cars.Move();
            robot.Move();

            // ODEV6.07,08,09,10 Eksik.




        }
    }
}