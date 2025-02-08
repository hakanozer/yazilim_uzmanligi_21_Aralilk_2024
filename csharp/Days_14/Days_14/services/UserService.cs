using System;
using Days_14.models;
using Days_14.user;

namespace Days_14.services
{
    public class UserService : IUser, IProfile
    {

        public UserModel? UserLogin(string email, string password)
        {
            if ( email.Equals("ali@mail.com") && password.Equals("12345") )
            {
                UserModel user;
                user.uid = 100;
                user.name = "Ali";
                user.surname = "Bilmem";
                user.email = "ali@mail.com";
                user.password = "12345";
                return user;
            }
            return null;
        }

        public bool UserLogout(int uid)
        {
            throw new NotImplementedException();
        }

        public string UserName(int uid)
        {
            throw new NotImplementedException();
        }

        public UserModel? UserPublicProfile(int uid)
        {
            throw new NotImplementedException();
        }

        public bool UserRegister(UserModel userModel)
        {
            throw new NotImplementedException();
        }

        public void UserReport(int uid)
        {
            throw new NotImplementedException();
        }

        public UserModel? UserUpdate(UserModel userModel)
        {
            throw new NotImplementedException();
        }


    }
}

