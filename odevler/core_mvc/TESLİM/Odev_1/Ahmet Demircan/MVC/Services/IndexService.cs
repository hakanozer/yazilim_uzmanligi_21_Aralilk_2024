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

        public void UserLogin(string Email, string Password)
        {
            Console.WriteLine("IndexService Login");
            Console.WriteLine(Email);
            Console.WriteLine(Password);
        }
    }
}