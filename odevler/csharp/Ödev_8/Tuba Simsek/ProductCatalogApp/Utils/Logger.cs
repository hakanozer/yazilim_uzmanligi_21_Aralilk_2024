using System;
using System.IO;
using ProductCatalogApp.Services;


namespace ProductCatalogApp.Utils
{
    public static class Logger
    {
        private static readonly string logFilePath = "hata_log.txt";

        public static void Logla(string method, string message)
        {
            try
            {
                string log = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} | {method} | {message}";
                File.AppendAllText(logFilePath, log + Environment.NewLine);
            }
            catch
            {
                // Loglama sırasında bile hata oluşursa sessiz geç
            }
        }
    }
}
