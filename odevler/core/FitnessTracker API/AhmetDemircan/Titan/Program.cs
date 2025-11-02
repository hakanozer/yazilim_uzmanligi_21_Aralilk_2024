using Microsoft.EntityFrameworkCore;
using Titan.Utils;
using Titan.Services;
using Titan.Mappings;
using Microsoft.OpenApi.Models;
using Titan.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Swagger + JWT desteği
builder.Services.AddEndpointsApiExplorer(); // API Explorer'ı etkinleştirir
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Titan API",
        Version = "v1"
    });

    // JWT Bearer auth definition
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Bearer token. Örnek: Bearer {token}"
    });

    // Require Bearer auth across endpoints (can be overridden with [AllowAnonymous])
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
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
}); // Swagger üreticisini ekler

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

// JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

// Scoped Services
builder.Services.AddScoped<UserService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(AppProfile));

// Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Swagger UI Active
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Titan API v1");
        options.RoutePrefix = string.Empty; // http://localhost:5185
    });
}

// Middleware
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<GlobalExceptionHandler>();

app.MapControllers();
app.Run();
