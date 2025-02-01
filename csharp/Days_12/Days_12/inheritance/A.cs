using System;
namespace Days_12.inheritance
{
	public class A : Base
	{

		public int age = 30;

        public override void Call()
        {
			Write("A Write Call");
        }

        public int sum(int a, int b)
		{
			int sm = a + b;
			Console.WriteLine(sm);
			return sm;
		}
		
	}
}

