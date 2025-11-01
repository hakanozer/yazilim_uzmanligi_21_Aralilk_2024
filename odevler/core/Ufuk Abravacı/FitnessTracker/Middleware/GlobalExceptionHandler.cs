namespace FitnessTracker.Middleware;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext ctx)
    {
        try
        {
            await _next(ctx);
        }
        catch (Exception ex)
        {
            // Loglama
            _logger.LogError(ex, "Unhandled exception at {Path}", ctx.Request.Path);

            // Hata tipi belirleme
            var code = ex switch
            {
                UnauthorizedAccessException => HttpStatusCode.Unauthorized,
                KeyNotFoundException => HttpStatusCode.NotFound,
                InvalidOperationException => HttpStatusCode.BadRequest,
                _ => HttpStatusCode.InternalServerError
            };

            var response = new
            {
                error = ex.Message,
                status = (int)code,
                path = ctx.Request.Path,
                timestamp = DateTime.UtcNow
            };

            ctx.Response.ContentType = "application/json";
            ctx.Response.StatusCode = (int)code;

            var payload = JsonSerializer.Serialize(response);
            await ctx.Response.WriteAsync(payload);
        }
    }
}