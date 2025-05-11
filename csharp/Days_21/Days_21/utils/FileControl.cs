namespace Days_21.Utils
{
    public class FileControl
    {
        public void WriteToFile(string content) {
            // File.WriteAllText("file.txt",content); // Replace
            string line = Environment.NewLine;
            File.AppendAllText("file.txt", $"{content}{line}"); // Append - Ekle
        }
    }
}