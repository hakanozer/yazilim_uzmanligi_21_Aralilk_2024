using MongoDB.Driver;
using ProductCatalogApp.Models;
using ProductCatalogApp.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProductCatalogApp.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService()
        {
            var dbContext = new DatabaseContext();
            _products = dbContext.GetCollection<Product>("Products");
        }

        public void Ekle(Product product)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(product.Name))
                    throw new Exception("Ürün adı boş olamaz.");

                if (product.Price <= 0)
                    throw new Exception("Fiyat pozitif bir değer olmalıdır.");

                if (product.Stock < 0)
                    throw new Exception("Stok adedi negatif olamaz.");

                product.CreatedAt = DateTime.Now;
                _products.InsertOne(product);
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Ekle", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
            }
        }

        public void Guncelle(Product product)
        {
            try
            {
                var result = _products.ReplaceOne(p => p.Id == product.Id, product);

                if (result.MatchedCount == 0)
                    throw new Exception("Ürün bulunamadı.");
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Guncelle", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
            }
        }

        public void Sil(string id)
        {
            try
            {
                var result = _products.DeleteOne(p => p.Id == id);

                if (result.DeletedCount == 0)
                    throw new Exception("Ürün bulunamadı veya silinemedi.");
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Sil", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
            }
        }

        public Product Getir(string id)
        {
            try
            {
                return _products.Find(p => p.Id == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Getir", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
                return null;
            }
        }

        public List<Product> Listele(int sayfa = 1, int limit = 10)
        {
            try
            {
                return _products.Find(_ => true)
                    .SortByDescending(p => p.CreatedAt)
                    .Skip((sayfa - 1) * limit)
                    .Limit(limit)
                    .ToList();
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Listele", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
                return new List<Product>();
            }
        }

        public List<Product> Ara(string anahtarKelime)
        {
            try
            {
                var filtre = Builders<Product>.Filter.Or(
                    Builders<Product>.Filter.Regex("Name", new MongoDB.Bson.BsonRegularExpression(anahtarKelime, "i")),
                    Builders<Product>.Filter.Regex("Description", new MongoDB.Bson.BsonRegularExpression(anahtarKelime, "i"))
                );

                return _products.Find(filtre).ToList();
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Ara", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
                return new List<Product>();
            }
        }

        public List<Product> Filtrele(decimal? minFiyat = null, decimal? maxFiyat = null, string kategoriId = null)
        {
            try
            {
                var filtreBuilder = Builders<Product>.Filter;
                var filtreList = new List<FilterDefinition<Product>>();

                if (minFiyat.HasValue)
                    filtreList.Add(filtreBuilder.Gte(p => p.Price, minFiyat.Value));

                if (maxFiyat.HasValue)
                    filtreList.Add(filtreBuilder.Lte(p => p.Price, maxFiyat.Value));

                if (!string.IsNullOrEmpty(kategoriId))
                    filtreList.Add(filtreBuilder.Eq(p => p.CategoryId, kategoriId));

                var filtre = filtreList.Count > 0 ? filtreBuilder.And(filtreList) : filtreBuilder.Empty;

                return _products.Find(filtre).ToList();
            }
            catch (Exception ex)
            {
                Logger.Logla("ProductService.Filtrele", ex.Message);
                Console.WriteLine($"Hata: {ex.Message}");
                return new List<Product>();
            }
        }
    }
}
