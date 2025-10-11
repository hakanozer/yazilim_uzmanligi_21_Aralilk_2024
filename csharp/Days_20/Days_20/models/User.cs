using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Days_20.Models
{
    public class User
    {
        public ObjectId Id { get; set; }
        
        [BsonElement("id")]
        public int UId { get; set; }

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("surname")]
        public string? Surname { get; set; }

        [BsonElement("email")]
        public string? Email { get; set; }

        [BsonElement("gender")]
        public string? Gender { get; set; }

        [BsonElement("ip_address")]
        public string? Ip_address { get; set; }

        [BsonElement("age")]
        public int Age { get; set; }
        
        [BsonElement("date")]
        public DateTime Date { get; set; }
    }
}
