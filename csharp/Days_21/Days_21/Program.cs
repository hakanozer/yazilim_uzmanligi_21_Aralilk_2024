using System;
using Days_21.Utils;

namespace Days_21
{
    class Program
    {
        static void Main(string[] args)
        {
            FileControl fileControl = new ("data");
            fileControl.WriteToFile("Line-1");
            //fileControl.DeleteFile();
        }
    }
}