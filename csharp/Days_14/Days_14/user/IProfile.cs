using System;
using Days_14.models;

namespace Days_14.user
{
	public interface IProfile
	{
		UserModel? UserPublicProfile(int uid);
		bool UserLogout(int uid);
	}
}

