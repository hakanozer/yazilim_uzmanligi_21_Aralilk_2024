using Microsoft.EntityFrameworkCore;
using MVC.Models;

namespace MVC.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }


    }
}