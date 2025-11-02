using System.Text.Json;

namespace FitnessTracker_API.Middleware
{
    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
        
            string? message = exception.InnerException?.Message.ToString();
            _logger.LogError(
                exception,
                "Unhandled exception: {Message} | Path: {Path} | Type: {Type}",
                message,
                context.Request.Path,
                exception.GetType().ToString()
                );

            // Kullanıcıya Detay Verme
            var statusCode = StatusCodes.Status500InternalServerError;
            var response = new
            {
                error = message,
                code = statusCode,
                timestamp = DateTime.UtcNow
            };

            var payload = JsonSerializer.Serialize(response);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsync(payload);
        }
    }
}