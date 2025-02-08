using Days_14.models;
using Days_14.services;
using Days_14.user;

namespace Days_14
{

    public class Program
    {
        public static void Main(string[] args)
        {

            UserService userService = new UserService();
            object iUserx = new UserService();
            IUser iUserService = new UserService();
            IProfile iProfile = new UserService();

            // userService.UserLogout(10);

            call(userService);
            call(iUserService);
            // call(iUserx);
            // call(iProfile);

            UserModel? userModel = userService.UserLogin("ali@mail.co", "12345");
            if ( userModel != null )
            {
                Console.WriteLine("Giriş Başarılı");
            }else
            {
                Console.WriteLine("Bilgileriniz hatalı!");
            }


        }

        public static void call(IUser userService)
        {
            userService.UserLogin("", "");
        }

    }

}