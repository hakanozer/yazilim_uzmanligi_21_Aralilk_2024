using System;
namespace Days_6
{
	public class Action
	{

		// 123Ali
		public bool StringValid(string data)
		{
			// char[] arr = data.ToCharArray();
			char[] numbers = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
            bool status = true;
            foreach ( char c in data )
			{
				foreach( char n in numbers )
				{
					if (c == n)
					{
						status = false;
						break;
					}else
					{
                        status = true;
                    }
				}
			}
			return status;
		}


		public void Fibonacci( int number )
		{
			int a = 0;
			for(int i = 0; i < number; i++)
			{
				Console.WriteLine(a);
                a = i + a;
            }
		}

    }
}

