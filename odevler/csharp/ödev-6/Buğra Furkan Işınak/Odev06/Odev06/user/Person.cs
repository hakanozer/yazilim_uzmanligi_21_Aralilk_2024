using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Odev06;

namespace Odev06.user
{
    public class Person
    {
        private string username;
        private int userage;
        public virtual void UserName(string pName)
        {
            this.username = pName;
        }
        public virtual void UserAge(int age)
        {
         this.userage = age;
        }

        
    }
}
