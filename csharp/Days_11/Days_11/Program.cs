using System;
using Days_11.models;

namespace Days_11
{

    public class Program
    {
        static void Main(string[] args)
        {

            foreach(string item in args)
            {
                Console.WriteLine(item);
            }

            Program[] programs = new Program[10];
            //programs[0] = new Program();
            bool[] bools = new bool[10];
            int[] numbers = new int[10]; 
            string[] customer = new string[10];
            string[] users = { "Ali", "Zehra", "Kemal", "Ayşe", "Mehmet" };

            Console.WriteLine(programs[0]);
            Console.WriteLine(bools[0]);
            Console.WriteLine(numbers[0]);
            Console.WriteLine(customer[0]);
            Console.WriteLine(users[0]);

            Console.WriteLine("========================");
            for(int i = 0; i < users.Length; i++)
            {
                Console.WriteLine( users[i] );
            }
            Console.WriteLine("========================");
            foreach(string item in users)
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("========================");
            Product product = new Product();
            // Console.WriteLine($"age: {product.age}");

            string title = product.ProductSliderTitle();
            Console.WriteLine(title);

            bool saveStatus = product.ProductSave("TV", 100, "TV Detail", null);
            Console.WriteLine(saveStatus);

            ProductModel productModel;
            productModel.pid = null;
            productModel.title = "Samsung";
            productModel.price = 30000;
            productModel.detail = "Samsung Detail";
            productModel.status = null;
            productModel = product.save(productModel);
            Console.WriteLine( productModel );


            ProductModel model1 = new ProductModel(null, "Bilgisayar", "Bilgisayar Detay", 30000, true);
            model1 = product.save(model1);
            Console.WriteLine(model1);

            Console.WriteLine("==============================");
            ProductModel[] products = { productModel, model1 };
            foreach( ProductModel item in products )
            {
                Console.WriteLine(item);
            }

            Console.WriteLine("==============================");
            product.GetStatus(EStatus.ADMIN);

            try
            {
                // hata olma olasılığı olan kodlar
                int a = 1;
                int b = 1;
                int i = a / b;
            }catch(Exception ex)
            {
                // hata olduğunda çalışacak kodlar
                Console.WriteLine($"Bölme işlemi sırasında hata: {ex.Message}");
            }

        }
    }

}