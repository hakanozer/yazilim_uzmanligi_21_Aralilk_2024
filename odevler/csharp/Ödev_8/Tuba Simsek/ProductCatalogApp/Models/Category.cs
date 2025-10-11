using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductCatalogApp.Models
{
    public class Category
    {
        [BsonId] // MongoDB'nin ObjectId'si
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Ad")] // Veritabanında "Ad" olarak saklanacak
        public string? Name { get; set; }
    }
}
