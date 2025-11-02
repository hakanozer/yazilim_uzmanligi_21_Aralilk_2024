using Microsoft.EntityFrameworkCore;
using ActivityLogApi.Models;

namespace ActivityLogApi.Utils
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        //DBset veritabanındaki tabloları ifade eder.
        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Goal> Goals { get; set; }
        
    
    }
}