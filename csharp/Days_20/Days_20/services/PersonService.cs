using Days_20.Models;
using Days_20.Utils;
using MongoDB.Bson;
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


        // Get All Persons
        public List<Person> GetAllPersons()
        {
            List<Person> list = _personCollection.Find(_ => true).ToList();
            return list;
        }

        // delete person
        public void DeletePerson(string ID)
        {
            _personCollection.DeleteOne(x => x.Id.ToString() == ID);
        }

        public long DeletePersonByEmail(string email)
        {
            DeleteResult deleteResult = _personCollection.DeleteMany(x => x.Email == email);
            if (deleteResult.DeletedCount > 0)
            {
                return deleteResult.DeletedCount;
            }
            return 0;
        }

        // Update Person
        public bool UpdatePerson(Person person)
        {
            var filter = Builders<Person>.Filter.Eq(item => item.Id, person.Id);
            ReplaceOneResult replaceOneResult = _personCollection.ReplaceOne(filter, person);
            return replaceOneResult.ModifiedCount > 0;
        }
        
    }
}