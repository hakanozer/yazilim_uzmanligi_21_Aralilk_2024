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

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
else
{
    app.UseExceptionHandler("/Error");
    //app.UseDeveloperExceptionPage();
}
app.UseStatusCodePagesWithReExecute("/Error", "?code={0}");

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();

app.Run();
