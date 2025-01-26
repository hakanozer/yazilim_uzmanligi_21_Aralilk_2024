using System;
namespace Days_11.models
{
	public struct ProductModel
	{

		public int? pid;
		public string title;
		public string detail;
		public int price;
		public bool? status;

		public ProductModel(int? pid, string title, string detail, int price, bool? status)
		{
			this.pid = pid;
			this.title = title;
			this.detail = detail;
			this.price = price;
			this.status = status;
		}

        public override string ToString()
        {
			return $"{pid}-{title}-{detail}-{price}-{status}";
        }

    }
}

