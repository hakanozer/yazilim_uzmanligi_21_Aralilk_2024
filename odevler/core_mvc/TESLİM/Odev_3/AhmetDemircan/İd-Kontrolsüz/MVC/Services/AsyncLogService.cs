using System.Text;
using System.Threading.Channels;

namespace MVC.Services
{
    public class AsyncLogService
    {
        private readonly Channel<string> _logChannel = Channel.CreateUnbounded<string>();

        public AsyncLogService()
        {
            Task.Run(ProcessQueueAsync);
        }

        public async Task LogAsync(string message)
        {
            await _logChannel.Writer.WriteAsync(message);
        }

        private async Task ProcessQueueAsync()
        {
            Directory.CreateDirectory("logs");

            await foreach (var logMessage in _logChannel.Reader.ReadAllAsync())
            {
                var fileName = $"logs/{DateTime.Now:yyyy-MM-dd}.log";

                await File.AppendAllTextAsync(fileName, logMessage + Environment.NewLine, Encoding.UTF8);
            }
        }
    }
}
