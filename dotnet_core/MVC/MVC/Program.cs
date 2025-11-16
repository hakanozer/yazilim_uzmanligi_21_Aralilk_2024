using Microsoft.EntityFrameworkCore;
using MVC.Dto.Mappings;
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
builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
