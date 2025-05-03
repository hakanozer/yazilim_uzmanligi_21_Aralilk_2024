using System;
using Days_20.Models;
using Days_20.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Days_20
{
    class Program
    {
        static void Main(string[] args)
        {

            PersonService personService = new();
            Console.WriteLine($"MongoDB Person Service {ObjectId.GenerateNewId().ToString()}");
            Person p1 = new()
            {
                PersonId = ObjectId.GenerateNewId().ToString(),
                Name = "Kenan",
                Surname = "Bil",
                Email = "kemal@mail.com",
                Age = 30,
                IsActive = true,
                Color = "Red"
            };
            int p1Save = personService.AddPerson(p1);
            Console.WriteLine($"Save Status: {p1Save}");

        }
    }
}