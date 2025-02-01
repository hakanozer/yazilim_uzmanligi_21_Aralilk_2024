using Days_12.users;
using Days_12.inheritance;

namespace Days_12
{
    public class Program
    {
        public static void Main(string[] args)
        {

            UserLogin userLogin = new UserLogin();
            UserLogin user = new UserLogin("http://sanalDb.com");
            UserLogin userx = new UserLogin("http://yerelDb.com");

            user.UserRegister();
            user.UserRemember();

            userx.UserRegister();
            userx.UserRemember();

            ////////////////////////////////////
            Console.WriteLine("=============================");
            Base a = new A();
            B b = new B();
            C c = new C();

            // a => ?
            // a => A
            // a => Base
            // a => A + Base

            a.Call();
            b.Call();
            c.Call();

        }
    }
}