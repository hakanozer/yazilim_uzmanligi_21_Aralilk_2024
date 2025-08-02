using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



/*6. B%r IMovable arayüzü oluşturun ve bu arayüzde Move metodunu
          tanımlayın. Car ve Robot sınıflarını bu arayüzü kullanarak yazın
          ve Move metodunu her %k% sınıfta da farklı şek%lde uygulayın.*/



namespace Odev_6
{
    public interface IMovable
    {
        string Move();
    }
}
