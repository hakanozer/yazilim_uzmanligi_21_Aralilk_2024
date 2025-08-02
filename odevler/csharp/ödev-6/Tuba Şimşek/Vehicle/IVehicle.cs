
using System;
namespace Odev_6.Vehicle


    /*2. Bir IVehicle arayüzü oluşturun ve bu
arayüzde StartEngine ve StopEngine metodlarını tanımlayın. Car ve Bike sınıflarını
bu arayüzü kullanarak yazın.*/

{

    public interface IVehicle
    {
        public void StartEngine();
        public void StopEngine();
    }
}
