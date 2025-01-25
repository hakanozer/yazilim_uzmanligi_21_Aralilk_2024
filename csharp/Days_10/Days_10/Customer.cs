using System;
namespace Days_10
{
	public class Customer
	{

		public void Login( string email, string password )
		{
			Console.WriteLine($"{email} - {password}");
		}

		public void ProfileImageCrop(int width, int height)
		{
			try
			{
                Console.WriteLine($"{width} - {height}");
            }catch(Exception ex)
			{
				throw new Exception();
			}
			
        }

	}
}

