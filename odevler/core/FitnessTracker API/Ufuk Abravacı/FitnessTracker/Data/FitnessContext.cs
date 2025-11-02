namespace FitnessTracker.Data;
using FitnessTracker.Entities;
using Microsoft.EntityFrameworkCore;

public class FitnessContext : DbContext
{
    public FitnessContext(DbContextOptions<FitnessContext> opt) : base(opt) { }
    public DbSet<User> Users => Set<User>();
    public DbSet<Workout> Workouts => Set<Workout>();
    public DbSet<Goal> Goals => Set<Goal>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(x => x.UserName).IsUnique();
        b.Entity<User>().HasIndex(x => x.Email).IsUnique();
        b.Entity<Workout>().HasOne(x => x.User).WithMany(u => u.Workouts).HasForeignKey(x => x.UserId);
        b.Entity<Goal>().HasOne(x => x.User).WithMany(u => u.Goals).HasForeignKey(x => x.UserId);
    }
}