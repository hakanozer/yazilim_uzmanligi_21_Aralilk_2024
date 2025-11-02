using Microsoft.EntityFrameworkCore;
using FitnessRestApi.Models;

namespace FitnessRestApi.Utils
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Goal> Goals { get; set; } = null!;
        public DbSet<Workout> Workouts { get; set; } = null!;

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.FirstName).HasMaxLength(100);
                entity.Property(u => u.LastName).HasMaxLength(100);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(150);
                entity.Property(u => u.Password).IsRequired();
                entity.Property(u => u.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            
            modelBuilder.Entity<Goal>(entity =>
            {
                entity.HasKey(g => g.Id);
                entity.Property(g => g.Title).IsRequired().HasMaxLength(255);

                // Goal → User ilişkisi 
                entity.HasOne(g => g.User)
                      .WithMany() 
                      .HasForeignKey(g => g.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            
            modelBuilder.Entity<Workout>(entity =>
            {
                entity.HasKey(w => w.Id);
                entity.Property(w => w.Type).IsRequired().HasMaxLength(100);
                entity.Property(w => w.Date).HasDefaultValueSql("CURRENT_TIMESTAMP");

                // Workout → User ilişkisi
                entity.HasOne(w => w.User)
                      .WithMany() 
                      .HasForeignKey(w => w.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}


