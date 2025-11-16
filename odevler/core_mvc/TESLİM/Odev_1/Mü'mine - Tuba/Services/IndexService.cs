using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MVC.Services
{
    public class IndexService
    {
        public IndexService()
        {
        }

        public void UserLogin(string UserName, string Password)
        {
            Console.WriteLine("IndexService Login");
            Console.WriteLine(UserName);
            Console.WriteLine(Password);
        }
    }
}