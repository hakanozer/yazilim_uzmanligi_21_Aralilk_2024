using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Product_catalog.models
{
    public class Product
    {
        public Product()
        {
            Id = ObjectId.GenerateNewId(); // Id otomasyonu
            ekleme_tarihi = DateTime.Now; // Ekleme tarihi otomasyonu
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("id", Order = 0)]
        public string? id { get; set; }

        [BsonElement("adi")]
        public string? adi { get; set; }

        [BsonElement("aciklama")]
        public string? aciklama { get; set; }

        [BsonElement("fiyat")]
        public decimal fiyat { get; set; }

        [BsonElement("stok_adedi")]
        public int stok_adedi { get; set; }

        [BsonElement("KId")]
        public string? KId { get; set; }

        [BsonElement("ekleme_tarihi")]
        public DateTime ekleme_tarihi { get; set; }
    }
}