using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.employee
{
    public class Employee
    {

        private int Salary;

        public int salary
        {
            get
            {
                return Salary;
            }
            set { 
                 if(value >= 0)
                {
                    Salary = value;
                }
                else
                {
                    throw new Exception("Negative Value Problem.");
                }
            
            }
        }
    }
}
