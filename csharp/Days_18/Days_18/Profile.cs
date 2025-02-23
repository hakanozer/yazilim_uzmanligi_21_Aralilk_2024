using System;
namespace Days_18
{
	public abstract class Profile
	{

		public abstract int userID();

		public int call(int i)
		{
			return userID() * i;
		}
	}
}

