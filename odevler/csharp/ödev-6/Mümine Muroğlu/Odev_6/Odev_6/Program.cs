using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev_6.animals;
using Odev_6.employee;
using Odev_6.imovable;
using Odev_6.vehicle;

namespace Odev_6
{
    public class Program
    {
         public static void Main(string[] args)
        {

            //Odev_6.1

            Cat cat = new Cat();
            Dog dog = new Dog();

            cat.MakeSound();
            dog.MakeSound();

            Console.WriteLine("===================");

            //Odev_6.2

            IVehicle car = new Car();
            car.StartEngine();
            car.StopEngine();

            IVehicle bike = new Bike();
            bike.StartEngine();
            bike.StopEngine();

            Console.WriteLine("===================");

            //Odev_6.5

            Employee employee = new Employee();
            employee.salary = 20;
            Console.WriteLine(employee.salary);

            Console.WriteLine("===================");

            //Odev_6.6


            IMovable myRobot = new MyRobot();
            IMovable myCar = new MyCar();
            myRobot.Move();
            myCar.Move();

        }
    }
}
