using System;


namespace Odev_06
{
    public class Vehicle
    {
       
        public virtual double FuelEfficiency { get; set; }

       
        public virtual double CalculateFuelConsumption(double distance)
        {
            return FuelEfficiency * distance / 100;
        }
    }
}
