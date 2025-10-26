using Microsoft.EntityFrameworkCore;
using RestApi.Models;

namespace RestApi.Utils
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                modelBuilder.Entity<Appointment>()
                    .HasOne(a => a.User)
                    .WithMany()
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                modelBuilder.Entity<Appointment>()
                    .HasOne(a => a.Staff)
                    .WithMany()
                    .HasForeignKey(a => a.StaffId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}