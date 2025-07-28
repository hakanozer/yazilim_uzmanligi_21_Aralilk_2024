using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Odev_6.Shapes
{

    /*9. Bir IShape arayüzü oluşturun ve bu arayüzde Draw metodunu 
       tanımla. Circle ve Square sınıflarını bu arayüzü kullanarak yazın 
       ve Draw metodunu her iki sınıfta da farklı şekilde uygula*/
    public interface IShape
    {
        public void Draw();
    }
}
