using Product_catalog.models;
using Product_catalog.Utils;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Product_catalog.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Categories> _categoryCollection;

        public CategoryService()
        {
            MongoDBUtils _dbMongo = new MongoDBUtils();
            _categoryCollection = _dbMongo.GetCollection<Categories>("Categories");
        }

        // Add a new category
        public void AddCategory(Categories category)
        {
            _categoryCollection.InsertOne(category);
        }

        // Get all categories
        public List<Categories> GetAllCategories()
        {
            return _categoryCollection.Find(new BsonDocument()).ToList();
        }

        // Find KID by category name
        /* public Categories GetCategoryByKId(string categoryName)
         {
             var filter = Builders<Categories>.Filter.Regex("Kategori", categoryName);
             return _categoryCollection.Find(filter).FirstOrDefault();
         }*/
        // Find KID by category name
        public List<Categories> GetCategoryByKId(string partialName)
        {
            var lowerPartialName = partialName.ToLower();
            var result = _categoryCollection.AsQueryable()
            .Where(c => c.Kategori != null && c.Kategori.ToLower().Contains(lowerPartialName))
            .ToList();
            return result;
        }

        // Add a new category
        public void AddCategory(string categoryName)
        {
            var newCategory = new Categories
            {
                Kategori = categoryName
            };
            _categoryCollection.InsertOne(newCategory);
        }

        // Delete a category by ID
        public void DeleteCategory(string id)
        {
            var filter = Builders<Categories>.Filter.Eq("id", id);
            _categoryCollection.DeleteOne(filter);
        }
        // Update a category by ID
        public void UpdateCategory(string id, Categories updatedCategory)
        {
            var filter = Builders<Categories>.Filter.Eq("id", id);
            var update = Builders<Categories>.Update
                .Set("KId", updatedCategory.KId)
                .Set("Kategori", updatedCategory.Kategori);

            _categoryCollection.UpdateOne(filter, update);
        }
    }
}