using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_6.Employee
{
    public class Employee
    {
        private int salary;
        public int Salary 
        {

            get 
            {
            return salary;
            }
            set
            {
                if (salary >= 0) { return; }
                else { throw new Exception("Negatif değer girilmesi uygun değildir."); }
            }
        }
    }
}
