using System;
namespace Days_15.car_fabric
{
    public class Bmw : Car
    {
        public override string Fuel()
        {
            return "Diesel";
        }

        public override int Price()
        {
            return 3000000;
        }

        public override string Name()
        {
            return "BMW";
        }
    }
}

