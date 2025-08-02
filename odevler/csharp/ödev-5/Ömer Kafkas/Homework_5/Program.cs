using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_5
{
    internal class Program
    {
        public void Main(string[] args)
        {
            //Soru1: (Nullable Types)
            //Bir int? deðiþken tanýmlayýn ve bu deðiþkenin null olup olmadýðýný kontrol eden bir kod yazýn.
            //Cevap:

            int? nunableInt = null;
            if (nunableInt == null)
            {
                Console.WriteLine("nunableInt is null");
            }
            else
            {
                Console.WriteLine("nunableInt is not null");
            }

            //Soru2: (String Concat)
            //Ýki string deðiþkenini birleþtiren bir metot yazýn ve bu metodu kullanarak "Hello" ve "World" kelimelerini birleþtirin.
            //Cevap:

            string str1 = "Hello";
            string str2 = "World";
            string str3 = string.Concat(str1, str2);

            //Soru3: (String Equals)
            //Ýki string deðiþkeninin eþit olup olmadýðýný kontrol eden bir kod yazýn. Büyük/küçük harf duyarlýlýðýný göz önünde bulundurun.
            //Cevap:

            string str4 = "Hello";
            string str5 = "hello";
            if (str4.Equals(str5, StringComparison.Ordinal))
            {
                Console.WriteLine("str4 and str5 are not equal");
            }
            else
            {
                Console.WriteLine("str4 and str5 are equal");
            }

            //Soru4: (String Contains)
            //Bir string içinde belirli bir alt string'in olup olmadýðýný kontrol eden bir metot yazýn. Örneðin, "Hello World" içinde "World" kelimesinin olup olmadýðýný kontrol edin.
            //Cevap:

            string soru4 = "Hello World";
            if ( soru4.Contains("World"))
            {
                Console.WriteLine("Referans metin içerisinde aranan deger bulunmaktadir");
            }
            else
            {
                Console.WriteLine("Referans metin içerisinde aranan deger bulunmamaktadir");
            };


            //Soru5: (String Substring)
            //Bir string'in belirli bir indeksinden baþlayarak bir alt string elde eden bir metot yazýn. Örneðin, "Hello World" string'inden "World" kelimesini çýkarýn.
            //Cevap:

            string soru5 = "Hello World";
            string altString = soru5.Substring(6, 5);
            Console.WriteLine(altString);

            //Soru6: (String Insert)
            //Bir string'in belirli bir indeksine baþka bir string ekleyen bir metot yazýn. Örneðin, "Hello" string'ine 5. indeksten sonra " World" ekleyin.
            //Cevap:

            string soru6 = "Hello";
            string eklenecekString = "World";
            string yeniString = soru6.Insert(soru6.Length, eklenecekString);
            Console.WriteLine(yeniString);

            //Soru7: (String Remove)
            //Bir string'in belirli bir indeksinden baþlayarak belirli bir uzunluktaki kýsmýný silen bir metot yazýn. Örneðin, "Hello World" string'inden "World" kelimesini silin.
            //Cevap:

            string soru7 = "Hello World";
            string silinecekString = "World";
            int index = soru7.IndexOf(silinecekString);
            yeniString = soru7.Remove(index, silinecekString.Length);
            Console.WriteLine(yeniString);

            //Soru8: (String Split)
            //Bir string'i belirli bir karaktere göre bölen bir metot yazýn. Örneðin, "Hello,World" string'ini virgül karakterine göre bölün.
            //Cevap:

            string soru8 = "Hello,World";
            string[] parcalar = soru8.Split(',');
            foreach (string parca in parcalar)
            {
                Console.WriteLine(parca);
            }

            //Soru9: (String Replace)
            //Bir string içinde belirli bir alt string'i baþka bir alt string ile deðiþtiren bir metot yazýn. Örneðin, "Hello World" string'inde "World" kelimesini "C#" ile deðiþtirin.
            //Cevap:

            string soru9 = "Hello World";
            string degisecekString = "World";
            string yeniDeger = "C#";
            yeniString = soru9.Replace(degisecekString, yeniDeger);
            Console.WriteLine(yeniString);

            //Soru10: (String Trim)
            //Bir string'in baþýndaki ve sonundaki boþluklarý kaldýran bir metot yazýn. Örneðin, " Hello World " string'inin baþýndaki ve sonundaki boþluklarý kaldýrýn.
            //Cevap:

            

            //Soru11: (String IndexOf)
            //Bir string içinde belirli bir karakterin veya alt string'in ilk geçtiði indeksi bulan bir metot yazýn. Örneðin, "Hello World" string'inde "World" kelimesinin baþladýðý indeksi bulun.
            //Cevap:



            //Soru12: (Struct)
            //Bir struct tanýmlayýn ve bu struct'ý kullanarak bir nesne oluþturun. Örneðin, bir Point struct'ý tanýmlayýn ve bu struct'ý kullanarak bir nokta nesnesi oluþturun.
            //Cevap:

            //Soru13: (Enum)
            //Bir enum tanýmlayýn ve bu enum'ý kullanarak bir deðiþken oluþturun. Örneðin, bir DaysOfWeek enum'ý tanýmlayýn ve bu enum'ý kullanarak bir gün deðiþkeni oluþturup bir fonksiyonlarla birlikte kullanýn.
            //Cevap:


        }
    }
}
