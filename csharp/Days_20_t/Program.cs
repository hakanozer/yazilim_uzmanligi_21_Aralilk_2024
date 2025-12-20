using System;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Days_20_t
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("MongoProject");
            var collection = database.GetCollection<BsonDocument>("users");

            var allDocuments = collection.Find(new BsonDocument()).ToList();

            foreach (var document in allDocuments)
            {
                Console.WriteLine(document.ToString());
            }
        }
    }
}
