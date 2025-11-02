using FitnessTracker.Entities;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.API.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Goal> Goals { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}