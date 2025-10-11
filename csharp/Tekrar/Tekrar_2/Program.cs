// karar yapılar
// if

int a = 10;
int b = 12;

if (a > 15)
{
    Console.WriteLine("a > 5'ten büyüktür.");
}
else
{
    Console.WriteLine("Şartlar sağlanmadı");
}

int age = 18;
if (age >= 18)
{
    Console.WriteLine("Yaşınız uyuyor!");
}else
{
    Console.WriteLine("Yaşınız uymuyor");
}

// > -> sol taraf sağ taraftan büyük ise
// < -> sol taraf sağ tarafdan küçük ise
// >= sol taraf sağ taraftan büyük yada eşit
// <= sol taraf sağ taraftan küçük yada eşit
// != sol taraf sağ taraf ile eşit değil ise

// && -> ve || -> veya
// && -> sol taraftaki koşul ve sağ taraftaki koşul sağlanacak.

string username = "ali@mail.com";
string password = "12345";

if (username.ToLower() == "ali@mail.com" && password == "12345")
{
    Console.WriteLine("Giriş başarılı");
}else
{
    Console.WriteLine("Kullanıcı adı yada şifre hatalı!");
}


// || -> sol taraftaki koşul yada sağ taraftaki koşul sağlanmış ise
// yemek sepetinde - 100
// kredi kartı - 90
// kumbara - 122

if (a > 15 || b > a)
{
    Console.WriteLine("Koşullardan herhangi biri sağlandı");
}else
{
    Console.WriteLine("Koşulların hiç biri uymuyor!");
}


// dizi
// bir değişken içinde birden fazla değer tutmaya yarar.
string data = "ali veli hasan";
string istanbul = "İstanbul";
string ankara = "Ankara";

string[] cities = { "İstanbul", "Ankara", "İzmir", "Antalya", "Adana", "İzmit" };
string[] arr = { istanbul, ankara };

// index -> 0, dan başlar.
Console.WriteLine( cities[4] );

// for
for( int i = 0; i < 5; i++ )
{
    Console.WriteLine("Ali Bilmem -"  + i);
}

for ( int i = 2; i < cities.Length; i++ )
{
    Console.WriteLine($"{i} - {cities[i]}");
}

Console.WriteLine("--------------------");
// foreach
foreach(string item in cities)
{
    Console.WriteLine(item);
}
