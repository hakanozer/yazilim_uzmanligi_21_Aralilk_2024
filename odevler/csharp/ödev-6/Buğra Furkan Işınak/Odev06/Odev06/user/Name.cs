using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev06;

namespace Odev06.user
{
    public class Name : Person
    {
        private string username;

        public Name(String pName)
        {
            this.username = pName;
        }
        public override void UserName(string name)
        {
            this.username = name;
        }

        public string UserName()
        {
            Console.WriteLine($"Name: {this.username}");
            return username;
        }
    }
}
