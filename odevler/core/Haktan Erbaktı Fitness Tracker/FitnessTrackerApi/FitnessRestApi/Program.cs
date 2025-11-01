using AutoMapper;
using FitnessRestApi.Mappings;
using FitnessRestApi.Services;
using FitnessRestApi.Utils;
using FitnessTrackerApi.Middlewares;
using FitnessTrackerApi.Services;
using Microsoft.EntityFrameworkCore;

using RestApi.Utils;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerWithJwt();

// DbContext
builder.Services.AddDbContext<AppDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

// JWT Auth
builder.Services.AddJwtAuthentication(builder.Configuration);

// Services
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<GoalService>();
builder.Services.AddScoped<WorkoutService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Swagger UI Active
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Rest API v1");
        options.RoutePrefix = string.Empty;
    });
}


// Ensure Data folder exists
var dataDir = Path.Combine(Directory.GetCurrentDirectory(), "Data");
if (!Directory.Exists(dataDir))
    Directory.CreateDirectory(dataDir);


// Middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();



app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();
app.Run();
