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

            // Yaşı 30'dan büyük ve ip adresi belirli aralıkta olan kullanıcıları listele
            List<User> users = userService.AgeIP(30, "249");
            foreach (var user in users)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name}, Surname: {user.Surname}, Email: {user.Email}, Age: {user.Age}, IP Address: {user.Ip_address}");
            }
            Console.WriteLine("-------------------------------------------------");

            // Son bir ayda kaydedilen kullanıcıları listele
            List<User> usersDate = userService.UserDateReport();
            foreach (var user in usersDate)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name}, Surname: {user.Surname}, Email: {user.Email}, Age: {user.Age}, Date: {user.Date}");
            }
            Console.WriteLine("-------------------------------------------------");

            // Cinsiyete göre gruplama
            var genderStatus = userService.GrupByGender();
            genderStatus.ToList().ForEach(x =>
            {
                Console.WriteLine($"{x.Gender} : {x.Count}");
            });

            Console.WriteLine("-------------------------------------------------");
            // yaş ortalaması hesaplama
            double averageAge = userService.AverageAge();
            Console.WriteLine($"Average Age: {averageAge}");
            Console.WriteLine("-------------------------------------------------");

            // en yaşlı 5 kullanıcıyı listele
            List<User> top5OldestUsers = userService.GetTop5OldestUsers();
            foreach (var user in top5OldestUsers)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name}, Surname: {user.Surname}, Email: {user.Email}, Age: {user.Age}");
            }
            Console.WriteLine("-------------------------------------------------");

            // email null veya boş olan kullanıcıları listele
            List<User> usersWithNullEmail = userService.GetEmailNullOrEmpty();
            foreach (var user in usersWithNullEmail)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name}, Surname: {user.Surname}, Email: {user.Email}, Age: {user.Age}");
            }
            Console.WriteLine("-------------------------------------------------");

            // yaşı 20 ile 50 arasında olan ve ad ve soyadını getiren ve küçük harf ile yazdıran kullanıcıları listele
            List<User> getUsersAgeNames = userService.GetUsersByAgeAndName();
            foreach (var user in getUsersAgeNames)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name.ToLower()}, Surname: {user.Surname.ToLower()}, Email: {user.Email}, Age: {user.Age}");
            }
            Console.WriteLine($"{getUsersAgeNames.Count} Users Found");
            Console.WriteLine("-------------------------------------------------");

            // name ve surname alanlarının ilk harfi aynı olanlar kullanıcıları listele
            List<User> getUsersNameSurname = userService.GetUsersNameSurnameFirstCharEquals();
            foreach (var user in getUsersNameSurname)
            {
                Console.WriteLine($"ID: {user.Id},  UserID: {user.UId}, Name: {user.Name}, Surname: {user.Surname}, Email: {user.Email}, Age: {user.Age}");
            }
            Console.WriteLine("-------------------------------------------------");


        }
    }
}