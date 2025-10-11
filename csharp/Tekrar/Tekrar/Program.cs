// Değişkenler
// string değişkenler -> karakter katarı
string name = "Erkan";
string surname = "Bilmem";
string a = "true";
string b = "100";


Console.WriteLine($"{name} {surname}");

// tam sayı değişkenleri
// int
int age = 30;
int num1 = 20;
int num2 = 40;
int sm = num1 + num2;
Console.WriteLine($"Sum: {sm}");

// true - false
bool status = false;

// ondalıklı değerler
double ondalik1 = 40.5;
double ondalik2 = 66.8;
double toplamOndalik = ondalik1 + ondalik2;
Console.WriteLine(toplamOndalik);
Console.WriteLine("Toplam : " + toplamOndalik);
Console.WriteLine($"Toplam : {toplamOndalik}");


// kullanıcıdan veri alımı
Console.WriteLine("Lütfen adınızı giriniz!");
string firstName = Console.ReadLine();
Console.WriteLine("Girilen Değer : " + firstName);

Console.WriteLine("Yaşınızı Giriniz!");
string stAge = Console.ReadLine();
// Tür dönüşümü
int cAge = Convert.ToInt32(stAge);
// Convert.ToDouble("12.5");
// Convert.ToBoolean("true");
// Convert.ToString(100);
Console.WriteLine("Yaşınız : " + (cAge + 5));
