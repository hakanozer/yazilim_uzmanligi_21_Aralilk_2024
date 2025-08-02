namespace ROPerson
{
    class Person
    {
        private int age;
        public string Name {get;}
        public int Age 
        {
            get { return age; }  
            set 
            {
                if (value >= 0) 
                {
                    age = value;
                }
                else
                {
                    Console.WriteLine("Age cannot be negative!");
                }
            }
        }

        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }
    }
}