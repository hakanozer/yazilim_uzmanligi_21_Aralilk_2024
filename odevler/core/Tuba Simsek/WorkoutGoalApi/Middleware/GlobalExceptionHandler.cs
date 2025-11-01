using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace WorkoutGoalApi.Middleware
{
    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate _next;// next: işler yolunda olduğunda kullanıcının göreceği verilerdir
        private readonly ILogger<GlobalExceptionHandler> _logger; //logger: hata olduğunda kullanıcının sınırlı olması gerektiği kadar göreceği hatadır 500 - 404 vb. Ama yazılımcıya detaylı loglar bırakılır.

        public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context) // InvokeAsync: middleware'in ana işlevi, gelen HTTP isteklerini yakalar ve işler
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex); // handleExceptionAsync: hatayı işleyip uygun yanıtı döndüren yöntem 
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception) //
        {
            /*
            string? message = exception.Message;
            if (exception.GetType() == typeof(Microsoft.EntityFrameworkCore.DbUpdateException))
            {
                message = "UNIQUE constraint failed: Email";
            }
            */
            string? message = exception.InnerException?.Message.ToString(); // InnerException: daha spesifik hata mesajları için kullanılır.
            _logger.LogError(
                exception,
                "Unhandled exception: {Message} | Path: {Path} | IP: {IP} | Agent: {Agent} | Type: {Type}", // Loglama: hata mesajı, istek yolu, kullanıcı IP'si, kullanıcı ajanı ve hata türü gibi bilgileri içerir.
                message,
                context.Request.Path,
                context.Connection.RemoteIpAddress?.ToString(), //kullanıcın ıp adresini alır
                context.Request.Headers["User-Agent"].ToString(), //kullanıcı ajanı : kullanıcının tarayıcı, işletim sistemi ve cihaz bilgilerini içeren bir dizedir.
                exception.GetType().ToString() // hata türü 
                );

            // Kullanıcıya Detay Verme
            var statusCode = StatusCodes.Status500InternalServerError;
            var response = new 
            {
                error = message,
                code = statusCode,
                timestamp = DateTime.UtcNow 
            };

            var payload = JsonSerializer.Serialize(response); //response nesnesini json formatına çevirir
            context.Response.ContentType = "application/json"; //yanıtın json formatında olduğunu belirtir
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsync(payload);//kullanıcıya json formatında hata mesajı gönderir 
        }
    }

}