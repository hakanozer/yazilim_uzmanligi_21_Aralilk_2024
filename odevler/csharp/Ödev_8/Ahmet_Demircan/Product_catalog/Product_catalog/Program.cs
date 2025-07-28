using System;
using Product_catalog.Utils;
using Product_catalog.Services;
using Product_catalog.models;

namespace Product_catalog
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                MongoDBUtils dbMongo = new MongoDBUtils();
                var testCollection = dbMongo.GetCollection<dynamic>("TestCollection");
                Console.WriteLine("Connection succeeded");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Connection failed: " + ex.Message);
            }

            while (true)
            {
                Console.WriteLine(" ----Products----\n lsp - List all products \n addp - Add a new product \n rmp - Delete product \n up - update product \n ----Categories---\n lsc - List all categories \n lsn - Find KId by category name \n addc - Add a new category \n uc - Update categori \n rmc - Delete categori \n ---Exit--- \n q - Quit");

                var command = Console.ReadLine();
                if (command == "q")
                {
                    break;
                }
                else if (command == "rmc")
                {
                    // Delete a category
                    Console.WriteLine("Please press q to exit or any other key to continue with deleting a category.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    //Get categories by name
                    CategoryService categoryService = new CategoryService();
                    var categories = categoryService.GetAllCategories();
                    int i = 0;
                    foreach (var category in categories)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Categori, ID: {category.KId}, Kategori: {category.Kategori}\n");
                    }
                    Console.WriteLine("Enter category ID to delete: ");
                    var id = Console.ReadLine();

                    categoryService.DeleteCategory(id);
                }
                else if (command == "uc")
                {
                    // Update a category
                    Console.WriteLine("Please press q to exit or any other key to continue with updating a category.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    //Get categories by name
                    CategoryService categoryService = new CategoryService();
                    var categories = categoryService.GetAllCategories();
                    int i = 0;
                    foreach (var category in categories)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Categori, ID: {category.KId}, Kategori: {category.Kategori}\n");
                    }
                    Console.WriteLine("Enter category ID to update: ");
                    var id = Console.ReadLine();
                    Console.WriteLine("Enter new category name: ");
                    var categoryName = Console.ReadLine();

                    Categories updatedCategory = new Categories
                    {
                        Kategori = categoryName
                    };
                    categoryService.UpdateCategory(id, updatedCategory);
                }
                else if (command == "lsp")
                {
                    Console.WriteLine("Please press q to exit or any other key to continue with listing products.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    // Get all products
                    var productService = new ProductService();
                    var products = productService.GetAllProducts();
                    int i = 0;
                    foreach (var Product in products)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Product, ID: {Product.id}, Ürün: {Product.adi}, Açıklama{Product.aciklama},\n Fiyat: {Product.fiyat}, Stok adedi: {Product.stok_adedi}, Kategori: {Product.KId}, Ekleme tarihi: {Product.ekleme_tarihi}\n");
                    }
                }
                else if (command == "lsc")
                {
                    Console.WriteLine("Please press q to exit or any other key to continue with listing categories.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    //Get categories by name
                    CategoryService categoryService = new CategoryService();
                    var categories = categoryService.GetAllCategories();
                    int i = 0;
                    foreach (var category in categories)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Categori, ID: {category.KId}, Kategori: {category.Kategori}\n");
                    }
                }
                else if (command == "rmp")
                {
                    // Delete a product
                    Console.WriteLine("Please press q to exit or any other key to continue with deleting a product.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    Console.WriteLine("Enter product ID to delete: ");
                    var id = Console.ReadLine();

                    ProductService productService = new ProductService();
                    productService.DeleteProduct(id);
                }
                else if (command == "addp")
                {
                    // Add a new product
                    Console.WriteLine("Please press q to exit or any other key to continue with adding a new product.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    var productService = new ProductService();
                    var products = productService.GetAllProducts();
                    int i = 0;
                    foreach (var Product in products)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Product, ID: {Product.id}, Ürün: {Product.adi}, Açıklama{Product.aciklama},\n Fiyat: {Product.fiyat}, Stok adedi: {Product.stok_adedi}, Kategori: {Product.KId}, Ekleme tarihi: {Product.ekleme_tarihi}\n");
                    }
                    Console.WriteLine("Enter product name: ");
                    var adi = Console.ReadLine();
                    Console.WriteLine("Enter product description: ");
                    var aciklama = Console.ReadLine();
                    Console.WriteLine("Enter product price: ");
                    var fiyat = decimal.Parse(Console.ReadLine());
                    Console.WriteLine("Enter product stock quantity: ");
                    var stok_adedi = int.Parse(Console.ReadLine());
                    Console.WriteLine("Enter category ID: ");
                    var KId = Console.ReadLine();

                    Product newProduct = new Product
                    {
                        adi = adi,
                        aciklama = aciklama,
                        fiyat = fiyat,
                        stok_adedi = stok_adedi,
                        KId = KId
                    };
                    productService.AddProduct(newProduct);
                }
                else if (command == "up")
                {
                    // Update a product
                    Console.WriteLine("Please press q to exit or any other key to continue with updating a product.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    // Get all products
                    var productService = new ProductService();
                    var products = productService.GetAllProducts();
                    int i = 0;
                    foreach (var Product in products)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Product, ID: {Product.id}, Ürün: {Product.adi}, Açıklama{Product.aciklama},\n Fiyat: {Product.fiyat}, Stok adedi: {Product.stok_adedi}, Kategori: {Product.KId}, Ekleme tarihi: {Product.ekleme_tarihi}\n");
                    }
                    Console.WriteLine("Enter product ID to update: ");
                    var id = Console.ReadLine();
                    Console.WriteLine("Enter new product name: ");
                    var adi = Console.ReadLine();
                    Console.WriteLine("Enter new product description: ");
                    var aciklama = Console.ReadLine();
                    Console.WriteLine("Enter new product price: ");
                    var fiyat = decimal.Parse(Console.ReadLine());
                    Console.WriteLine("Enter new product stock quantity: ");
                    var stok_adedi = int.Parse(Console.ReadLine());
                    Console.WriteLine("Enter new category ID: ");
                    var KId = Console.ReadLine();

                    Product updatedProduct = new Product
                    {
                        adi = adi,
                        aciklama = aciklama,
                        fiyat = fiyat,
                        stok_adedi = stok_adedi,
                        KId = KId
                    };
                    productService.UpdateProduct(id, updatedProduct);
                }
                else if (command == "rmp")
                {
                    // Delete a product
                    Console.WriteLine("Please press q to exit or any other key to continue with deleting a product.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }

                    // Get all products
                    var productService = new ProductService();
                    var products = productService.GetAllProducts();
                    int i = 0;
                    foreach (var Product in products)
                    {
                        i++;
                        Console.WriteLine($"\n{i}.Product, ID: {Product.id}, Ürün: {Product.adi}, Açıklama{Product.aciklama},\n Fiyat: {Product.fiyat}, Stok adedi: {Product.stok_adedi}, Kategori: {Product.KId}, Ekleme tarihi: {Product.ekleme_tarihi}\n");
                    }
                    Console.WriteLine("Enter product ID to delete: ");
                    var id = Console.ReadLine();

                    productService.DeleteProduct(id);
                }
                else if (command == "addc")
                {
                    // Add a new category
                    Console.WriteLine("Please press q to exit or any other key to continue with adding a new category.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    Console.WriteLine("Enter category name: ");
                    var categoryName = Console.ReadLine();
                    if (string.IsNullOrEmpty(categoryName))
                    {
                        Console.WriteLine("Category name cannot be empty.");
                        return;
                    }

                    CategoryService categoryService = new CategoryService();
                    Categories newCategory = new Categories
                    {
                        Kategori = categoryName
                    };
                    categoryService.AddCategory(newCategory);
                }
                else if (command == "lsn")
                {
                    //Find Kıd by category name Console site
                    Console.WriteLine("Please press q to exit or any other key to continue with category name search.");
                    if (Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }
                    Console.WriteLine("Enter category name: ");
                    var categoryName = Console.ReadLine();
                    if (string.IsNullOrEmpty(categoryName))
                    {
                        Console.WriteLine("Category name cannot be empty.");
                        return;
                    }

                    // Initialize categoryService
                    CategoryService categoryService = new CategoryService();
                    var categoriesByName = categoryService.GetCategoryByKId(categoryName);
                    if (categoriesByName != null && categoriesByName.Count > 0)
                    {
                        Console.WriteLine($"Categories found with name '{categoryName}':");
                        foreach (var categoryByName in categoriesByName)
                        {
                            Console.WriteLine($"ID: {categoryByName.KId}, Kategori: {categoryByName.Kategori}");
                            // Find product by KId part of the (Find Kıd by category name Console site)
                            var kId = categoryByName.KId;
                            ProductService productService = new ProductService();
                            var productByKId = productService.GetProductByKId(kId);
                            if (productByKId != null)
                            {
                                Console.WriteLine($"ID: {productByKId.id}, Ürün: {productByKId.adi}, Açıklama{productByKId.aciklama}, Fiyat: {productByKId.fiyat}, Stok adedi: {productByKId.stok_adedi}, Kategori: {productByKId.KId}, Ekleme tarihi: {productByKId.ekleme_tarihi}");
                            }
                            else
                            {
                                Console.WriteLine($"No category found with name '{categoryName}'.");
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine($"No category found with name '{categoryName}'.");
                    }
                }
            }
        }
    }
}