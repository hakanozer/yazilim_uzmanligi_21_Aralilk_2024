using Days_20.Models;
using Days_20.Utils;
using MongoDB.Driver;

namespace Days_20.Services
{
    public class PersonService
    {
        private readonly IMongoCollection<Person> _personCollection;
        
        public PersonService()
        {
            DBMongo dbMongo = new();
            _personCollection = dbMongo.GetCollection<Person>("persons");
        }

        // Add Person
        public int AddPerson(Person person)
        {
            try
            {
                _personCollection.InsertOne(person);
                Console.WriteLine($"PersonID: {person.PersonId} added successfully.");
                return 1;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            return 0;
        }
    }
}