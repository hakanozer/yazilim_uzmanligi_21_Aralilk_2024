using System;
namespace Days_16.models
{
	public struct Product
	{

		public string title;
		public string detail;
		public int price;
		public bool status;

		public Product() { }

        public Product(string title, string detail, int price) {
			this.title = title;
			this.detail = detail;
			this.price = price;
			this.status = true;
		}

        public override string ToString()
        {
            return $"{title} - {detail} - {price} - {status}";
        }

    }
}

