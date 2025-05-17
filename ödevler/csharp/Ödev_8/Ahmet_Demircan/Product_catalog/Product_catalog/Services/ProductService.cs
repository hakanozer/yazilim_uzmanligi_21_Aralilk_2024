using Product_catalog.models;
using Product_catalog.Utils;
using Product_catalog.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Product_catalog.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _productCollection;

        public ProductService()
        {
            MongoDBUtils _dbMongo = new MongoDBUtils();
            _productCollection = _dbMongo.GetCollection<Product>("Products");
        }

        // Add a new product
        public void AddProduct(Product product)
        {
            _productCollection.InsertOne(product);
        }

        // Get all products
        public List<Product> GetAllProducts()
        {
            return _productCollection.Find(new BsonDocument()).ToList();
        }

        // Find product by KId
        public Product GetProductByKId(string kId)
        {
            var filter = Builders<Product>.Filter.Eq("KId", kId);
            return _productCollection.Find(filter).FirstOrDefault();
        }

        // Delete a product by ID

        public void DeleteProduct(string id)
        {
            var filter = Builders<Product>.Filter.Eq("id", id);
            _productCollection.DeleteOne(filter);
        }
        // Update a product by ID
        public void UpdateProduct(string id, Product updatedProduct)
        {
            var filter = Builders<Product>.Filter.Eq("id", id);
            var update = Builders<Product>.Update
                .Set("adi", updatedProduct.adi)
                .Set("aciklama", updatedProduct.aciklama)
                .Set("fiyat", updatedProduct.fiyat)
                .Set("stok_adedi", updatedProduct.stok_adedi)
                .Set("KId", updatedProduct.KId)
                .Set("ekleme_tarihi", updatedProduct.ekleme_tarihi);

            _productCollection.UpdateOne(filter, update);
        }
    }
}