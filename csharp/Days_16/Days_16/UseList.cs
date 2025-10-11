using System;
using System.Collections.Generic;
using Days_16.models;

namespace Days_16
{
	public class UseList
	{
		public void Call()
		{

			// List
			// Belirli bir tür için çalışmasını istediğimiz bir collections
			// generic - farklı türlerin bir sınıfa aktarılarak o sınıf içindeki
			// methodların hangi tür için çalışması gerektiğine karar verir.

			List<string> ls = new List<string>();

			ls.Add("Ali");
			ls.Add("Kemal");
			ls.Add("Ayşe");
			ls.Add("Zehra");

			// to array
			string[] arr = ls.ToArray();

			for(; ; )
			{
				Console.WriteLine("Lütfen isim giriniz, kapat için X");
				string name = Console.ReadLine();
				name = "X";
				if (name.Equals("X"))
				{
					break;
				}
				ls.Add(name);
			}

			foreach (string item in ls)
			{
				Console.WriteLine(item);
			}

			Console.WriteLine("======================");
			List<Product> products = new List<Product>();

			Product p1;
			p1.title = "iPad";
			p1.detail = "iPad Detail";
			p1.price = 30000;
			p1.status = true;
            products.Add(p1);

            // runtime
            // ürün ekleme
            // istenen ürünün silinmesi
			// index değeri iste, bu indexin var olup olmadığını kıyasla.
			// eğer silinmek istenen index yoksa uyarı ver. 


			for(; ;)
			{
				Product p;
                Console.WriteLine("Title Giriniz");
				p.title = Console.ReadLine();

                Console.WriteLine("Detay Giriniz");
                p.detail = Console.ReadLine();

                Console.WriteLine("Fiyat Giriniz");
                p.price = Convert.ToInt32(Console.ReadLine());

				p.status = true;
				products.Add(p);

                Console.WriteLine("Durdurmak için 'X' Giriniz");
				string status = Console.ReadLine();
				if (status.Equals("X"))
				{
					break;
				}
            }

            Console.WriteLine("===============");
			// sil - for
			Console.WriteLine("Silme için 'X'");
			string deleteStatus = Console.ReadLine();
			if (deleteStatus.Equals("X"))
			{
				for(; ;)
				{
					Console.WriteLine($"Silmek istediğiniz sırayı giriniz, 1 - {products.Count} ");
					string stIndex = Console.ReadLine();
					try{
                        int index = Convert.ToInt32(stIndex);
						if (index > 0)
						{
							index = index - 1;
							if (index < products.Count)
							{
								products.RemoveAt(index);
								Console.WriteLine("Silme işlemi devam etsin mi?, 'D'");
								string delete = Console.ReadLine();
								if (!delete.Equals("D"))
								{
									break;
								}
							}else
							{
								Console.WriteLine("Silmek istediğiniz ürün bulunumadı!");
							}
						}else
						{
							Console.WriteLine("Lüfen sadece pozitif değerler giriniz!");
						}
                    }
                    catch (Exception ex){
						Console.WriteLine("Lütfen sadece sayısal değer giriniz!");
					}
				}
			}

            Console.WriteLine("===============");
			foreach( Product item in products )
			{
				Console.WriteLine(item);
			}

        }
	}
}

