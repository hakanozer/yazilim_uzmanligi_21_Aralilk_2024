using System;
using Days_21.Utils;

namespace Days_21
{
    class Program
    {
        static void Main(string[] args)
        {
            FileControl fileControl = new ("toplanti");
            //fileControl.WriteToFile("person-3");
            //fileControl.DeleteFile();
            /*
            List<string> ls = fileControl.ReadFile();
            foreach (var line in ls)
            {
                Console.WriteLine(line);
            }
            */
            List<string> filesList = fileControl.ListFile();
            int count = 1;
            foreach (var filePath in filesList)
            {
                Console.WriteLine($"{count} - {filePath}");
                count++;
            }
            Console.WriteLine("Lütfen okumak istediğiniz dosyayı seçiniz!");
            int index =  Convert.ToInt32(Console.ReadLine());
            string fullFile = filesList[index - 1];
            string plainFileName = fullFile.Substring(0, fullFile.Length - 4);
            
            fileControl = new (plainFileName);
            Console.WriteLine($"=========={plainFileName}===========");
            List<string> ls = fileControl.ReadFile();
            foreach (var line in ls)
            {
                Console.WriteLine(line);
            }

        }
    }
}