using MVC.Services;
using MVC.Utils;
using Microsoft.EntityFrameworkCore;
using MVC.Mappings;

var builder = WebApplication.CreateBuilder(args);


// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

builder.Services.AddRazorPages();

builder.Services.AddScoped<IndexService>(); 
builder.Services.AddScoped<RegisterService>(); 


builder.Services.AddAutoMapper(typeof(AppProfile));

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