using Microsoft.EntityFrameworkCore;
using RestApi.Utils;
using RestApi.Services;
using RestApi.Mappings;
using RestApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Open Api Özelliği - Swagger
builder.Services.AddOpenApi();

// ApplicationDbContext Class Add Container
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

// JWT Configuration
builder.Services.AddJwtAuthentication(builder.Configuration);

// Add Class Scoped
builder.Services.AddScoped<UserService>();

// Add Mapper Class
builder.Services.AddAutoMapper(typeof(UserProfile));

// Controllers Class Add Container
builder.Services.AddControllers();

var app = builder.Build();
app.MapOpenApi();
//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// App Add Middleware
app.UseMiddleware<GlobalExceptionHandler>();

// Controllers Class Maps
app.MapControllers();
app.Run();