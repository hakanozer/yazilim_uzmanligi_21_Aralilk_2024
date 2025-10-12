using Microsoft.EntityFrameworkCore;
using RestApi.Utils;

var builder = WebApplication.CreateBuilder(args);

// Open Api Özelliği - Swagger
builder.Services.AddOpenApi();

// ApplicationDbContext Class Add Container
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

// Controllers Class Add Container
builder.Services.AddControllers();

var app = builder.Build();
app.MapOpenApi();
app.UseHttpsRedirection();

// Controllers Class Maps
app.MapControllers();
app.Run();