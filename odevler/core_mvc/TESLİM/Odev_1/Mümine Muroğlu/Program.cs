using Microsoft.EntityFrameworkCore;
using MVC.Utils;
using AutoMapper;
using MVC.Mappings;
using MVC.Services;

var builder = WebApplication.CreateBuilder(args);

// Razor Pages
builder.Services.AddRazorPages();

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

// AutoMapper
builder.Services.AddAutoMapper(typeof(AppProfile));

builder.Services.AddScoped<IndexService>();
builder.Services.AddScoped<RegisterService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();