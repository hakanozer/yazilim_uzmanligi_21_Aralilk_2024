using System;
using Days_11.models;

namespace Days_11
{
	public class Product
	{

		public int age = 30;
		Customer customer = new Customer();
		int productId = 0;

		public Product()
		{
			Console.WriteLine(age);
            productId = 101;
		}

		public string ProductSliderTitle()
		{
			string title = "";
			if (productId == 100)
			{
                title = "TV";
			}else if (productId == 101)
			{
                title = "iPhone";
			}

			if (!title.Equals(""))
			{
			}

			return title;
		}


		public bool ProductSave( string title, double price, string detail, bool? status )
		{
			Console.WriteLine($"{title} - {price} - {detail} - {status}");
			return true;
		}

		public ProductModel save( ProductModel productModel )
		{
			productModel.pid = new Random().Next(1000);
			return productModel;
		}


		public void GetStatus( EStatus eStatus )
		{
			if( eStatus == EStatus.USER )
			{
				Console.WriteLine("User Status");
			}else if (eStatus == EStatus.ADMIN)
			{
                Console.WriteLine("Admin Status");
            }else if (eStatus == EStatus.CUSTOMER)
			{
                Console.WriteLine("Customer Status");
            }else
			{
                Console.WriteLine("Empty Status");
            }
		}
	

	}
}

