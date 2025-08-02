using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev06;
using Odev06.customer;

namespace Odev06.customer
{
    public class Salary
    {
        private int Pid;


        public int pid
        {
            get
            {
                Console.WriteLine("Salary Number Call");
                return Pid;
            }
            set {
                if (value > 0)
                {
                    Pid = value;
                }
                else
                {
                    throw new Exception("Negatif Değer tanımlanamaz.");
                }
            }
        }
    }
}
