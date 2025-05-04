using System;
using Days_20.Models;
using Days_20.Services;
using Days_20.Utils;
using MongoDB.Bson;

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
                Name = "Ali",
                Surname = "Bil",
                Email = "ali@mail.com",
                Age = 25,
                IsActive = false,
                Color = "Red"
            };
            int p1Save = personService.AddPerson(p1);
            Console.WriteLine($"Save Status: {p1Save}");

            // Delete Person
            personService.DeletePerson("6815f7154b0c767db2a36d98");

            // Delete Person by Email
            long deleteCount = personService.DeletePersonByEmail("ken@mail.com");
            Console.WriteLine($"Deleted Count: {deleteCount}");

            // Update Person
            string id = "6815f7ad975636530cf9e1e7";
            Person p2 = new()
            {
                Id = ObjectId.Parse(id),
                PersonId = ObjectId.GenerateNewId().ToString(),
                Name = "Serkan",
                Surname = "Yilmaz",
                Email = "mehmet@mail.com",
                Age = 35,
                IsActive = true,
                Color = "Blue"
            };
            bool updateStatus = personService.UpdatePerson(p2);
            Console.WriteLine($"Update Status: {updateStatus}");

            // Get All Persons
            List<Person> persons = personService.GetAllPersons();
            foreach (var person in persons)
            {
                Console.WriteLine($"ID: {person.Id},  PersonID: {person.PersonId}, Name: {person.Name}, Surname: {person.Surname}, Email: {person.Email}, Age: {person.Age}, Active: {person.IsActive}");
            }

            Console.WriteLine("-------------------------------------------------");
            UserService userService = new();
            UserPage usersPage = userService.GetAllUsersPage(10, 1);
            Console.WriteLine($"Total Count: {usersPage.TotalCount}");
            Console.WriteLine($"Total Page: {usersPage.TotalPage}");
            foreach (var user in usersPage.Users)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name}, Surname: {user.Surname}, Email: {user.Email}, Age: {user.Age}");
            }
            Console.WriteLine("-------------------------------------------------");

        }
    }
}