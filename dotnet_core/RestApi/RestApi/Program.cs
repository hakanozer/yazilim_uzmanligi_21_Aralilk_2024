using Microsoft.EntityFrameworkCore;
using RestApi.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// ApplicationDbContext Class Add Container
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});

var app = builder.Build();

app.MapOpenApi();
app.UseHttpsRedirection();


app.Run();