using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Odev_6.Vehicle;

namespace Odev_6
{
    public class Car3 : IMovable, IVehicle
    {
        public string Move()
        {
            return " Arabaların hareket tipleri şunlardır: doğrusal, dairesel, eğik hareketi ve frenleme yapabilir ";
        }

        public string StartEngine()
        {
            return "Araba çalıştı.";
        }

        public string StopEngine()
        {
            return "Araba durdu!";
        }

        void IVehicle.StartEngine()
        {
            throw new NotImplementedException();
        }

        void IVehicle.StopEngine()
        {
            throw new NotImplementedException();
        }
    }
}
