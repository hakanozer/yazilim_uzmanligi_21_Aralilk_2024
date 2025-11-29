using System.Text;
using Microsoft.AspNetCore.Diagnostics;
using MVC.Services;

namespace MVC.Middleware
{
    
    public class ExceptionLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AsyncLogService _logService;

        public ExceptionLoggingMiddleware(RequestDelegate next, AsyncLogService logService)
        {
            _next = next;
            _logService = logService;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);  // devam et
            }
            catch (Exception ex)
            {
                await LogExceptionAsync(context, ex);
                throw; // ExceptionHandler middleware görsün
            }

            // Eğer ExceptionHandler devreye girdiyse
            var feature = context.Features.Get<IExceptionHandlerPathFeature>();
            if (feature != null)
            {
                await LogExceptionAsync(context, feature.Error);
            }
        }

        private async Task LogExceptionAsync(HttpContext context, Exception ex)
        {
            var message = BuildFullErrorMessage(context, ex);
            await _logService.LogAsync(message);
        }

        private string BuildFullErrorMessage(HttpContext context, Exception ex)
        {
            var sb = new StringBuilder();

            sb.AppendLine("------------------------------------------------------------");
            sb.AppendLine($"Timestamp: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
            sb.AppendLine($"Path: {context.Request.Path}");
            sb.AppendLine($"Method: {context.Request.Method}");
            sb.AppendLine();

            sb.AppendLine($"Exception: {ex.GetType().Name}");
            sb.AppendLine($"Message: {ex.Message}");
            sb.AppendLine();

            var inner = ex.InnerException;
            while (inner != null)
            {
                sb.AppendLine($"Inner: {inner.GetType().Name}: {inner.Message}");
                inner = inner.InnerException;
            }

            sb.AppendLine();
            sb.AppendLine("StackTrace:");
            sb.AppendLine(ex.StackTrace ?? "(no stacktrace)");
            sb.AppendLine("------------------------------------------------------------");
            sb.AppendLine();

            return sb.ToString();
        }
    }

}
