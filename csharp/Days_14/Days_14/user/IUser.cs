using System;
using Days_14.models;

namespace Days_14.user
{
	public interface IUser
	{
		// interfaceler nesne olarak üretilemezler.
		// burada gövdeli method yazılamaz.
		// bir sınıfa mutlaka implement edilmelidir.

		public bool UserRegister(UserModel userModel);
		public UserModel UserLogin(string email, string password);
		public string UserName(int uid);
		public void UserReport(int uid);
		public UserModel UserUpdate(UserModel userModel);

	}
}

