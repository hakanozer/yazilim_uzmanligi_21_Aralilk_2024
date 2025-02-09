using System;
namespace Days_15
{
	public abstract class Customer
	{
		public abstract int GetCustomeId();
        // total
        // name

        public string GetName()
		{
            int customerID = GetCustomeId();
            if (customerID == 100)
			{
				return "Ali Bilmem";
			}else if (customerID == 200)
			{
				return "Zehra Bilirim";
			}
			return "";
		}

		public int GetTotal()
		{
            int customerID = GetCustomeId();
            if (customerID == 100)
            {
				return 1000000;
            }
            else if (customerID == 200)
            {
				return 2000000;
            }
			return 0;
        }


	}
}

