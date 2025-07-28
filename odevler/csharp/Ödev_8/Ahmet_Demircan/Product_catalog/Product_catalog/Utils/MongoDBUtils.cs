using MongoDB.Driver;

namespace Product_catalog.Utils
{
    public class MongoDBUtils
    {
        private readonly string connectionString = "mongodb://localhost:27017";
        private readonly string databaseName = "Product_catalog";
        private readonly IMongoDatabase _database;

        public MongoDBUtils()
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }

        
    }
}