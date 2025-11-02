using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FitnessTracker.API.Data;
using Microsoft.OpenApi.Models;
using FitnessTracker.API.Utils;
using FitnessTracker.API.Services;
using FitnessTracker.Services;
using FitnessTracker.API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// SQLite veritabanı bağlantısı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

// Controller desteği
builder.Services.AddControllers();

//Token servisi
builder.Services.AddScoped<TokenService>();

//Jwt yapılandırması

builder.Services.AddJwtAuthentication(builder.Configuration);

// User servisi
builder.Services.AddScoped<UserService>();

//workout servisi
builder.Services.AddScoped<WorkoutService>();

//goal servisi
builder.Services.AddScoped<GoalService>();

// AutoMapper ekle
builder.Services.AddAutoMapper(typeof(Program));


// Swagger yapılandırması
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FitnessTracker API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Swagger UI (geliştirme ortamında)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseMiddleware<GlobalExceptionHandler>();


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseRouting();

app.MapControllers();

app.Run();