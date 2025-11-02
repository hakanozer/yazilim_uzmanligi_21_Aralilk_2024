using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ActivityLogApi.Middleware
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
            /*
            string? message = exception.Message;
            if (exception.GetType() == typeof(Microsoft.EntityFrameworkCore.DbUpdateException))
            {
                message = "UNIQUE constraint failed: Email";
            }
            */
            string? message = exception.InnerException?.Message.ToString();
            _logger.LogError(
                exception,
                "Unhandled exception: {Message} | Path: {Path} | IP: {IP} | Agent: {Agent} | Type: {Type}",
                message,
                context.Request.Path,
                context.Connection.RemoteIpAddress?.ToString(),
                context.Request.Headers["User-Agent"].ToString(),//Hangi yazılım programı ile birlikte çalışıyorsak onun bilgisi gelecek
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