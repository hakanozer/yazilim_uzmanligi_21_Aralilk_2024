// karar kontrol yapısı
// if
/*
 
if (şart) {
    // şartlar sağlandıktan sonra çalışacak kodlar
}else {
    // şartlar sağlanmadığında çalışacak kodlar
}

 */

// kullanıcıdan yaşını girmesini istediniz
// age >= 18 olması durumunda üye olabilirsiniz
// age < 18 olması durumunda üye olamazsınız

Console.WriteLine("Lütfen yaşınızı giriniz!");
// string stAge = Console.ReadLine();
string stAge = "21";
int age = Convert.ToInt32(stAge);


if (age > 0)
{

    bool status = age >= 18;
    if (status)
    {
        Console.WriteLine("üye olabilirsiniz");
    }
    else
    {
        Console.WriteLine("üye olamazsınız");
    }

}else
{
    Console.WriteLine("Lütfen pozitif değerler giriniz!");
}

string email = "ali@mail.com";
string password = "1234";
// logic -> &&
if (email == "ali@mail.com" && password == "12345")
{
    Console.WriteLine("Giriş Başarılı");
}else
{
    Console.WriteLine("Kullanıcı adı yada şifre hatalı!");
}

if ( email.Equals("ali@mail.com") && password.Equals("12345") )
{

}


// else - if
// doğruyu bulduğunda durma özelliğine sahiptir.
Console.WriteLine("==========================");
string name = "ali";
string surname = "bilmem";
string phone = "543";

if ( name.Equals("") )
{
    Console.WriteLine("Lütfen adınızı giriniz!");
}else if ( surname.Equals("") )
{
    Console.WriteLine("Lütfen soyadınızı giriniz!");
}else if ( phone.Equals("") )
{
    Console.WriteLine("Lütfen telefon no giriniz!");
}else
{
    Console.WriteLine("Form Gönderiliyor..");
}

Console.WriteLine("==========================");
int dayNumber = 4;

if ( dayNumber > 0 && dayNumber <= 7 ) { 
    if (dayNumber == 1)
    {
        Console.WriteLine("Gönderim Pazartesi");
    }else if(dayNumber == 2)
    {
        Console.WriteLine("Gönderim Salı");
    }else if(dayNumber == 3)
    {
        Console.WriteLine("Gönderim Çarşamba");
    }else
    {
        Console.WriteLine("Seçtiğiniz gün gönderimimiz bulunmamaktadır!");
    }
}else
{
    Console.WriteLine("Lütfen 1-7 arasında bir değer giriniz!");
}

Console.WriteLine("==========================");
// switch
// şartın kesin olarak arandığı yer
string menu = "Haberler";
switch(menu)
{
    case "Haberler":
        Console.WriteLine("Haberler Tıklandı");
        break;
    case "Videolar":
        Console.WriteLine("Videolar Tıklandı");
        break;
    default:
        Console.WriteLine("Tümü Seçildi");
        break;
}

Console.WriteLine("==========================");
//  tek satırlı if
string gun = dayNumber == 2 ? "Salı" : "Çarşamba";
Console.WriteLine(gun);
if (dayNumber == 2)
{
    gun = "Salı";
    // ...
}else
{
    gun = "Çarşamba";
    // ...
}

Console.WriteLine("==========================");
// diziler
// bir değişken içerisinde birden fazla değer barındırmaya yarar
string[] cities = { "İstanbul", "Ankara", "Bursa", "Adana", "Gaziantep"};
Console.WriteLine(cities);
// index -> 0 dan başlayıp dizinin elemanlarına erişim yoludur.
int index = -1;
// Length -> dizi içindeki toplam eleman sayısını verir
int size = cities.Length;
Console.WriteLine("Dizi Size : " + size);
if ( index > -1 && size > index )
{
    Console.WriteLine( cities[index] );
}else
{
    Console.WriteLine( $"Lütfen 0-{size-1} da bir değer giriniz"  );
}

// int dizi
int[] numbers = { 10,44,55,66,77,33,44 };
Console.WriteLine( numbers[2] );


// loop
// Tekrarlanan işlemler için loop kullanılır.
// for loop
Console.WriteLine("==========================");
for ( int i = 0; i < 10; i++ )
{
    Console.WriteLine( $"For Loop - {i}" );
}

Console.WriteLine("==========================");
for( int i = 0; i < cities.Length; i++ )
{
    Console.WriteLine( cities[i] );
}