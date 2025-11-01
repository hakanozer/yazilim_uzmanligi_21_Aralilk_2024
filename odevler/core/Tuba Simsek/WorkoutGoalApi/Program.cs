using Microsoft.EntityFrameworkCore;
using WorkoutGoalApi.Utils;
using WorkoutGoalApi.Services;
using WorkoutGoalApi.Mappings;
using WorkoutGoalApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

//Swagger + JWT desteği
builder.Services.AddSwaggerWithJwt();

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(option => // burada injection yöntemi ile dbcontexti kullanıma açıyoruz
{
    var path = builder.Configuration.GetConnectionString("DefaultConnection");
    option.UseSqlite(path);
});


// JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

// HttpContextAccessor eklenmesi (kullanıcı bilgilerini almak için)
builder.Services.AddHttpContextAccessor(); 

// Scoped Services --> sayesinde uygulama boyunca tek bir instance oluşturulur ve istek bazında kullanılır. bu işlem injection yöntemi ile yapılır
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<WorkoutService>();
builder.Services.AddScoped<GoalService>();


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
        options.RoutePrefix = string.Empty; // http://localhost:5282
    });
}

// Middleware
app.UseHttpsRedirection(); 
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<GlobalExceptionHandler>();  // genel hata yönetimi sağlayan middleware

app.MapControllers();
app.Run();
