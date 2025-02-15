using System;

namespace Odev_06
{
    public class Employee
    {
        private double salary;

        public double Salary
        {
            get
            {
                return salary;
            }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentException("Maaş negatif bir değer alamaz.");
                }
                salary = value;
            }

        }

             public Employee(double salary)

        {
            Salary = salary; // Setter metodu kullanılarak maaş atanır
        }


    }

      
}

