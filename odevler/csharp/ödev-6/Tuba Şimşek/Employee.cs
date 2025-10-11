using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6
{
    /*5. B%r Employee sınıfı oluşturun ve bu sınıfta Salary özell%ğ%n%
            tanımlayın. Salary özell%ğ% negat%f b%r değer alamayacak şek%lde getter ve setter
            metodlarını yazın.*/

    public class Employee
    {
        private double salary;

        public string Name { get; set; }

        public double Salary
        {
            get { return salary; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentException("Salary cannot be negative!");
                }
                salary = value;
            }
        }

        public Employee(string name, double salary)
        {
            Name = name;
            Salary = salary; 
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"Employee: {Name}, Salary: {Salary:C}");
        }
    }
}
