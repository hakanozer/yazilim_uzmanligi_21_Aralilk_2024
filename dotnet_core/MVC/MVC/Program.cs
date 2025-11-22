using Microsoft.EntityFrameworkCore;
using MVC.Dto.Mappings;
using MVC.Middleware;
using MVC.Services;
using MVC.Utils;

var builder = WebApplication.CreateBuilder(args);

// DbContext
var dbPath = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    option.UseSqlite(dbPath);
});

// AutoMapper
builder.Services.AddAutoMapper(typeof(AppProfile));

// Add services to the container.
builder.Services.AddRazorPages();

// Add DI
builder.Services.AddSingleton<AsyncLogService>();
builder.Services.AddScoped<UserService>();
var app = builder.Build();

app.UseMiddleware<ExceptionLoggingMiddleware>();

app.UseExceptionHandler("/Error");
app.UseStatusCodePagesWithReExecute("/Error", "?code={0}");

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();

app.Run();
