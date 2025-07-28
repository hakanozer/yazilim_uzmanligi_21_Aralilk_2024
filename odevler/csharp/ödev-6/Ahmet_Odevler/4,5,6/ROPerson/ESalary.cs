namespace ROPerson
{
    class ESalary
    {
        private int salary;
        public string Name {get;}
        public int Salary 
        {
            get { return salary; }  
            set 
            {
                if (value >= 0) 
                {
                    salary = value;
                }
                else
                {
                    Console.WriteLine("Salary cannot be negative!");
                }
            }
        }

        public ESalary(string name, int salary)
        {
            Name = name;
            Salary = salary;
        }
    }
}