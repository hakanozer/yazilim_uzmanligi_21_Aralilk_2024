using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev06;

namespace Odev06.user
{
    public class Age : Person
    {
        private int pAge;
        public Age(int uAge)
        {
            this.pAge = uAge;
        }
        public override void UserAge(int age)
        {
            this.pAge = age;
            Console.WriteLine($"Age: {age}");
        }

        public int UserAge()
        {
            Console.WriteLine($"Age: {this.pAge}");
            return pAge;
        }
    }
}
