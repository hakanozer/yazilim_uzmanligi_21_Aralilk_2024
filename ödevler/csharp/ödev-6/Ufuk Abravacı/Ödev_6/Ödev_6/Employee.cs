using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ödev_6
{
    internal class Employee
    {
        private int _salary;
        public int Salary 
        {
            get { return _salary; }
            set {
                if (value < 0) throw new Exception("You cannot assign negative values.");
                else
                {
                    _salary = value;
                }
            } 
        }
    }
}
