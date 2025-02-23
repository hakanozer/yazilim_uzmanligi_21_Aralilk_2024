using System;
namespace Days_18
{
	public class Action : Calls, IAction
	{
		public int a = 10;

		public Action()
		{
            Console.WriteLine("line - 2");
            List<string> ls = new List<string>();
			Console.WriteLine(a);
		}

        public int Sum(int num1, int num2)
		{
			int sm = num1 + num2;
			return sm;
        }

        public int Minus(int num1, int num2)
        {
            throw new NotImplementedException();
        }

        public string UserName(int uid)
        {
            throw new NotImplementedException();
        }

    }
}

