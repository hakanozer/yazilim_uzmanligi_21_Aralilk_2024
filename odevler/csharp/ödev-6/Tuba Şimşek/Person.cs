/*4. Bir Person sınıfı oluşturun ve bu sınıfta Name ve Age özelliklerini
            tanımlayın. Name özelliği sadece okunabilir, Age özelliği ise hem okunabilir hem
            de yazılabilir olsun.*/

namespace Odev_6
{
    public class Person
    {
        public string? Name { get; }
        public int Age { get; set; }

    }
}
