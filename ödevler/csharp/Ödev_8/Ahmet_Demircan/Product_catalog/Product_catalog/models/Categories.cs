using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Product_catalog.Utils
{
    public class Categories
    {
        public ObjectId Id { get; set; }

        [BsonElement("KId", Order = 0)]
        public string? KId { get; set; }

        [BsonElement("Kategori")]
        public string? Kategori { get; set; }
    }
}