using System;
namespace Days_12.inheritance
{
	public class Base
	{
		public Base()
		{
			Console.WriteLine("Base Call");
		}

        // virtual -> override edilmeye uygun method 
        public virtual void Call()
		{

		}

		public void Write( string data )
		{
			Console.WriteLine(data);
		}
 
	}
}

