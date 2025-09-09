using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.IO;

namespace ProductCatalogApp.Utils
{
    public class DatabaseContext
    {
        private readonly IMongoDatabase _database;

        public DatabaseContext()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration["MongoDB:ConnectionString"];
            var databaseName = configuration["MongoDB:DatabaseName"];

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string name) => _database.GetCollection<T>(name);
    }
}
