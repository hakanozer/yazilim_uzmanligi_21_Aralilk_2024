using MongoDB.Driver;
using ProductCatalogApp.Models;
using ProductCatalogApp.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProductCatalogApp.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoryService()
        {
            var dbContext = new DatabaseContext();
            _categories = dbContext.GetCollection<Category>("Categories");
        }

        public void Ekle(Category category)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(category.Name))
                    throw new Exception("Kategori adı boş olamaz.");

                var mevcut = _categories.Find(x => x.Name == category.Name).FirstOrDefault();
                if (mevcut != null)
                    throw new Exception("Bu kategori adı zaten mevcut.");

                _categories.InsertOne(category);
            }
            catch (Exception ex)
            {
                Logger.Logla("CategoryService.Ekle", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
            }
        }

        public void Guncelle(Category category)
        {
            try
            {
                var result = _categories.ReplaceOne(c => c.Id == category.Id, category);

                if (result.MatchedCount == 0)
                    throw new Exception("Kategori bulunamadı.");
            }
            catch (Exception ex)
            {
                Logger.Logla("CategoryService.Guncelle", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
            }
        }

        public void Sil(string id)
        {
            try
            {
                // Burada bağlı ürün kontrolü ProductService içinde yapılacak
                var result = _categories.DeleteOne(c => c.Id == id);

                if (result.DeletedCount == 0)
                    throw new Exception("Kategori bulunamadı veya silinemedi.");
            }
            catch (Exception ex)
            {
                Logger.Logla("CategoryService.Sil", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
            }
        }

        public Category Getir(string id)
        {
            try
            {
                return _categories.Find(c => c.Id == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Logger.Logla("CategoryService.Getir", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
                return null;
            }
        }

        public List<Category> Listele()
        {
            try
            {
                return _categories.Find(_ => true).ToList();
            }
            catch (Exception ex)
            {
                Logger.Logla("CategoryService.Listele", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
                return new List<Category>();
            }
        }
    }
}
