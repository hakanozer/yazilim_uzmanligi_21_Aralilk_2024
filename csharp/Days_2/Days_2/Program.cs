// kullanıcıdan veri alımı
Console.WriteLine("Name?");
string name = Console.ReadLine();

Console.WriteLine("Surname?");
string surname = Console.ReadLine();

string nameSurname = name + " " + surname;
Console.WriteLine(nameSurname);

// ******************************************************************************
// Type casting - Tür Dönüşümü
Console.WriteLine("Age?");
string stAge = Console.ReadLine();
int age = Convert.ToInt32(stAge);
Console.WriteLine(age);

// ************************************************************************************
double n1 = 50.6;
double n2 = 70.6;
double dSum = n1 + n2; // 121.2
int cdSum = Convert.ToInt32(dSum); // 121

int cN1 = Convert.ToInt32(n1); // 51
 int cN2 = Convert.ToInt32(n2); // 71
int sm = cN1 + cN2;

Console.WriteLine("========================");
Console.WriteLine(cN1);
Console.WriteLine(cN2);
Console.WriteLine($"Double Toplam: {cdSum}");
Console.WriteLine($"Toplam : {sm}"); // 122


Console.WriteLine("========================");
// ****************************************************************************************************************************************************************
// Operatörler

// Aritmatik operatörler
// +, -, *, / , %
double a = 50;
double b = 24;
double end = 0;

end = a + b;
Console.WriteLine($"Toplam: {end}");

end = a -  b;
Console.WriteLine($"Çıkarma: {end}");

end = a / b;
Console.WriteLine($"Bölme: {end}");

end = a * b;
Console.WriteLine($"Çarpma: {end}");

// mod alma
// bölümden kalan
end = b % 10;
Console.WriteLine($"Mod b % 10: {end}");

// Artırma ve eksiltme operatörleri
// +1, -1
// ++, --
int x = 0;
x = x + 1;
Console.WriteLine($"x: {x}");
x++;
Console.WriteLine($"x: {x}");
Console.WriteLine($"x: {x++}");
Console.WriteLine($"x: {x}");
Console.WriteLine($"x: {++x}");

// 4
x++; ++x; x++;
Console.WriteLine($" -- x -- : {x++}");
Console.WriteLine($" -- x -- : {x}");


x += 3;
x *= 2;
Console.WriteLine($"x: {x}");

Console.WriteLine("=========== Mantıksal operatörler =============");
// ****************************************************************************************************************************************************************
// Mantıksal operatörler
// işlemlerini yaptıktan sonra geriye(bool) true - false yanıtlar getirirler
// ==, !=, >, <, >=, <=

int q = 10;
int w = 11;
bool status = false;

// ==
// sol taraf ile sağ tarafın eşit olduğu durumlarda true dönderir
status = q == w;
Console.WriteLine($" == : {status}");
string username = "ali";
status = username.Equals( "ali" ); // username == "ali"
Console.WriteLine($" == : {status}");

Console.WriteLine("Lütfen kullanıcı adınızı giriniz!");
username = Console.ReadLine();

Console.WriteLine("Lütfen şifrenizi giriniz!");
string password =  Console.ReadLine();

status = username.Equals("ali01");
Console.WriteLine($" username : {status}");

status = password.Equals("12345");
Console.WriteLine($" password : {status}");

// !=
// eşit değil ise
status = q != 0;
Console.WriteLine($" != : {status}");

// >
// sol tarafdaki değer sağ taraftaki değerden büyük ise
status = q > w;
Console.WriteLine($" > : {status}");

// <
// sol tarafdaki değer sağ taraftaki değerden küçük ise
status = q < w;
Console.WriteLine($" < : {status}");

// >=
// sol tarafdaki değer sağ taraftaki değere eşit yada büyük
status = q >= w;
Console.WriteLine($" >= : {status}");

// <=
// sol tarafdaki değer sağ taraftaki değere eşit yada küçük
status = q <= w;
Console.WriteLine($" <= : {status}");

// logic kapılar
// &&, ||
// && -> sol tarafdaki şart ile sağ taraftaki şart sağlanmış(true) olmuş ise
int ageX = 21;
// bool status1 = ageX >= 18;
// bool status2 = ageX <= 50;
status = ageX >= 18 && ageX <= 50;
Console.WriteLine($" && : {status}");

// || -> sol tarafdaki şart veya sağ taraftaki şart sağlanmış(true) ise
status = q > 9 || q < 8;
Console.WriteLine($" || : {status}");