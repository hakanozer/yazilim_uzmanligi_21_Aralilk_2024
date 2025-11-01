using Microsoft.EntityFrameworkCore;
using RestApi.Utils;
using RestApi.Services;
using RestApi.Mappings;
using RestApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Swagger + JWT desteği
builder.Services.AddSwaggerWithJwt();

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
builder.Services.AddScoped<CategoryService>();

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
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Rest API v1");
        options.RoutePrefix = string.Empty; // http://localhost:5235
    });
}

// Middleware
//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<GlobalExceptionHandler>();

app.MapControllers();
app.Run();
