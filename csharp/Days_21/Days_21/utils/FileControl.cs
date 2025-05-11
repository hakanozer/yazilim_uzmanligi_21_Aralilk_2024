using System.Reflection.Metadata;

namespace Days_21.Utils
{
    public class FileControl
    {
        private readonly string _FolderPath = "files";
        private readonly string _FilePath;

        public FileControl() {
            FolderControlOrCreate();
            DateTime date = DateTime.Now;
            _FilePath = $"{_FolderPath}/{date.Day}_{date.Month}_{date.Year}.txt";
        }

        public FileControl(string FilePath) {
            FolderControlOrCreate();
            _FilePath = $"{_FolderPath}/{FilePath}.txt";
        }

        private void FolderControlOrCreate() {
            if (!Directory.Exists(_FolderPath)) {
                Directory.CreateDirectory(_FolderPath);
            }
        }

        public void WriteToFile(string content) {
            // File.WriteAllText("file.txt",content); // Replace
            Console.WriteLine(Environment.OSVersion.VersionString);
            string line = Environment.NewLine;
            File.AppendAllText(_FilePath, $"{content}{line}"); // Append - Ekle
        }

        public void DeleteFile() {
            if(File.Exists(_FilePath)) {
                File.Delete(_FilePath);
            }
        }

    }
}