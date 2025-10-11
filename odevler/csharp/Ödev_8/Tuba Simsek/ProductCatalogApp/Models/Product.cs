using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ProductCatalogApp.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string? Name { get; set; }  // zorunlu

        [BsonElement("Description")]
        public string? Description { get; set; }

        [BsonElement("Price")]
        public decimal Price { get; set; }  // zorunlu, pozitif

        [BsonElement("Stock")]
        public int Stock { get; set; }  // zorunlu, sıfır veya pozitif

        [BsonElement("CategoryId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? CategoryId { get; set; }

        [BsonElement("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
