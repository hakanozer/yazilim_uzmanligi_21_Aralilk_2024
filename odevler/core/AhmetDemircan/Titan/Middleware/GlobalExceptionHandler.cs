using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;
using System.ComponentModel.DataAnnotations;

namespace Titan.Middleware
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
            var statusCode = StatusCodes.Status500InternalServerError;
            var message = "An internal server error occurred.";
            var details = string.Empty;

            // Farklı exception türlerine göre özel işlem
            switch (exception)
            {
                case ValidationException validationEx:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = "Validation failed.";
                    details = validationEx.Message;
                    break;

                case ArgumentNullException argNullEx:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = "Required parameter is missing.";
                    details = argNullEx.ParamName ?? "Unknown parameter";
                    break;

                case ArgumentException argEx:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = "Invalid argument provided.";
                    details = argEx.Message;
                    break;

                case UnauthorizedAccessException:
                    statusCode = StatusCodes.Status401Unauthorized;
                    message = "Unauthorized access.";
                    break;

                case AuthenticationException:
                    statusCode = StatusCodes.Status401Unauthorized;
                    message = "Authentication failed.";
                    break;

                case KeyNotFoundException:
                    statusCode = StatusCodes.Status404NotFound;
                    message = "Resource not found.";
                    break;

                case DbUpdateException dbEx:
                    statusCode = StatusCodes.Status409Conflict;
                    message = "Database operation failed.";
                    
                    // Özel veritabanı hatalarını yakala
                    if (dbEx.InnerException?.Message.Contains("UNIQUE constraint failed") == true)
                    {
                        if (dbEx.InnerException.Message.Contains("Email"))
                        {
                            message = "Email address already exists.";
                            details = "This email is already registered.";
                        }
                        else
                        {
                            message = "Duplicate entry detected.";
                            details = "The data you're trying to save already exists.";
                        }
                    }
                    else if (dbEx.InnerException?.Message.Contains("FOREIGN KEY constraint failed") == true)
                    {
                        message = "Invalid reference data.";
                        details = "Referenced data does not exist.";
                    }
                    break;

                case InvalidOperationException invOpEx:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = "Invalid operation.";
                    details = invOpEx.Message;
                    break;

                case TimeoutException:
                    statusCode = StatusCodes.Status408RequestTimeout;
                    message = "Request timeout.";
                    break;

                case NotSupportedException:
                    statusCode = StatusCodes.Status501NotImplemented;
                    message = "Operation not supported.";
                    break;

                default:
                    // Genel server hatası
                    message = "An unexpected error occurred.";
                    details = exception.Message;
                    break;
            }

            // Loglama - güvenlik için hassas bilgileri logla ama kullanıcıya gösterme
            _logger.LogError(
                exception,
                "Exception handled: {ExceptionType} | Message: {Message} | Path: {Path} | IP: {IP} | Agent: {Agent} | StatusCode: {StatusCode}",
                exception.GetType().Name,
                exception.Message,
                context.Request.Path,
                context.Connection.RemoteIpAddress?.ToString(),
                context.Request.Headers["User-Agent"].ToString(),
                statusCode
            );

            // Response oluştur
            var response = new
            {
                error = new
                {
                    message = message,
                    details = !string.IsNullOrEmpty(details) ? details : null,
                    code = statusCode,
                    timestamp = DateTime.UtcNow,
                    path = context.Request.Path.Value
                }
            };

            var payload = JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            });

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            
            // CORS headers ekle (gerekirse)
            if (!context.Response.HasStarted)
            {
                await context.Response.WriteAsync(payload);
            }
        }
    }
}