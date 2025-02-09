using System;
namespace Days_15
{
    public class Person : Customer
    {
        private int cid;
        public Person(int cid)
        {
            this.cid = cid;
        }

        public override int GetCustomeId()
        {
            Console.WriteLine("GetCustomeId Call");
            return cid;
        }
    }
}

