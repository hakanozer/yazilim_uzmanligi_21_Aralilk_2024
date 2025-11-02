using FitnessTracker_API.Services;
using FitnessTracker_API.Utils;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using FitnessTracker_API.Mappings;
using FitnessTracker_API.Middleware;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);


// Swagger Ekleme
builder.Services.AddSwaggerServices();

// DB Bağlantısı
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    // Veritabanı yolunu proje dizinine göre ayarla
    var dbPath = connectionString?.Replace("Data Source = ", "").Replace("Data Source=", "").Trim();
    if (!string.IsNullOrEmpty(dbPath) && !Path.IsPathRooted(dbPath))
    {
        // Relatif path ise ContentRootPath'e göre ayarla (proje dizini)
        var contentRootPath = builder.Environment.ContentRootPath;
        dbPath = Path.Combine(contentRootPath, dbPath);
        // Dizin yoksa oluştur
        var dbDirectory = Path.GetDirectoryName(dbPath);
        if (!string.IsNullOrEmpty(dbDirectory) && !Directory.Exists(dbDirectory))
        {
            Directory.CreateDirectory(dbDirectory);
        }
    }
    option.UseSqlite($"Data Source={dbPath}");
});

// Jwt Kontrol
builder.Services.AddJwtAuthentication(builder.Configuration);



// Servis Katmanları Ekleme
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<WorkOutService>();
builder.Services.AddScoped<GoalService>();

// Controller Katmanları Ekleme
builder.Services.AddControllers();

//AutoMapper Katmanı Ekleme- Dto models dönüşümü
builder.Services.AddAutoMapper(typeof(UserProfile), typeof(WorkoutProfile), typeof(GoalProfile));

var app = builder.Build();

// Swagger Kullanımı
app.UseSwaggerServices();

// Jwt Kullanımı
app.UseAuthentication();
app.UseAuthorization();

// Middleware Ekleme--Global Hata
app.UseMiddleware<GlobalExceptionHandler>();


app.MapControllers();
app.Run();

