using System;
namespace Days_15.car_fabric
{
	public abstract class Car
	{
		public abstract string Name();
		public abstract int Price();
		public abstract string Fuel();

		public virtual string Color()
		{
			return "White";
		}

		public string Move()
		{
			return "Move Call";
		}

		public void Report()
		{
			Console.WriteLine($"{Name()} - {Fuel()} - {Price()} - {Color()} - {Move()}");
		}

	}
}

