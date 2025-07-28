using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_5
{
    public struct Personel
    {
        public string name;
        public string surname;
        public int age;
        public string city;

        // Constructor
        public Personel(string name, string surname, int age, string city)
        {
            this.name = name;
            this.surname = surname;
            this.age = age;
            this.city = city;
        }

        // Method to display personel information
        public void DisplayInfo()
        {
            Console.WriteLine($"Name: {name}, Surname: {surname}, Age: {age}, City: {city}");
        }
    }
}
