using Microsoft.EntityFrameworkCore;
using Titan.Models;

namespace Titan.Utils
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Activitys> Activities { get; set; }
        public DbSet<Aim> Aims { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aim>()
                .HasOne(a => a.ActivityGoal)
                .WithMany(ag => ag.Aims)
                .HasForeignKey(a => a.ActivityGoalId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
