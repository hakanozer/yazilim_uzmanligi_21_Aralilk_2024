namespace ROPerson
{
class Program
    {
        static void Main()
        {
            Person p = new Person("Ahmet", 25);

            Console.WriteLine($"Name: {p.Name}");
            Console.WriteLine($"Age: {p.Age}");

            Console.WriteLine("Write new age:");
            
            
            if (int.TryParse(Console.ReadLine(), out int newAge))
            {
                p.Age = newAge;
                Console.WriteLine($"Updated Age: {p.Age}");
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter a valid number.");
            }

            ESalary s = new ESalary("Ahmet", 10000);

            Console.WriteLine($"Name: {s.Name}");
            Console.WriteLine($"Salary: {s.Salary}");

            Console.WriteLine("Write new Salary:");

            if (int.TryParse(Console.ReadLine(), out int newSalary))
            {
                s.Salary = newSalary;
                Console.WriteLine($"Updated Salary: {s.Salary}");
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter a valid number.");
            }
            
            IMovable car = new Car();
            IMovable roboat = new Roboat();

            car.Move();
            roboat.Move();
        }
    }
}
