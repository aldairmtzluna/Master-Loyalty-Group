using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDBContext : ApplicationDBContext
{
    public ApplicationDBContext(DbContextOPtions options) : base(options) { }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Users>().HashIndex(u => u.Email).IsUnique();
    }
}