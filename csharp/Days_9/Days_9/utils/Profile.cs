using System;
using Days_9.models;

namespace Days_9.utils
{
	public class Profile
	{
		public Product save( Product product )
		{
			product.pid = 100;
			return product;
		}

		public int Days(EDay eDay)
		{
			switch(eDay)
			{
				case EDay.PAZARTESI:
					return 10;
				case EDay.SALI:
					return 20;
				case EDay.CARSAMBA:
					return 30;
				default:
					return 0;
			}
		}

	}
}

