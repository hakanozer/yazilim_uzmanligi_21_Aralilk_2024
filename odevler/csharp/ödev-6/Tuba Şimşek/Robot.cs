using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6
{
    public class Robot : IMovable
    {
        public string Move()
        {
            return "Robot hareketinin tipleri şunlardır: Doğrusal - Dönerli- Kartezyen - Silindirik - Küresel - Eklemli - Delta";
        }
    }
}
