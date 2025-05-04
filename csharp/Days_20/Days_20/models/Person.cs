using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Days_20.Models
{
    public class Person
    {

        public Person()
        {
            SaveDate = DateTime.Now;
            if (IsActive == null)
            {
                IsActive = true;
            }
        }

        public ObjectId Id { get; set; }

        [BsonElement("personid", Order = 0)]
        public string? PersonId { get; set; }

        [BsonElement("name", Order = 1)]
        public string? Name { get; set; }

        [BsonElement("surname", Order = 2)]
        public string? Surname { get; set; }

        [BsonElement("email", Order = 3)]
        public string? Email { get; set; }

        [BsonDefaultValue(18)]
        [BsonElement("age", Order = 4)]
        public int Age { get; set; }

        [BsonElement("savedate", Order = 6)]
        public DateTime SaveDate { get; set; }
        
        [BsonElement("isactive", Order = 5)]
        public bool? IsActive { get; set; }

        [BsonIgnore]
        [BsonElement("color", Order = 7)]
        public string? Color { get; set; }
    
    }
}