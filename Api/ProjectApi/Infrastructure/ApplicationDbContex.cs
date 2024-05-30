using Domain.Entity;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture;

public class ApplicationDbContex: DbContext
{
    public DbSet<Project> _projectDbSet;


    public ApplicationDbContex(DbContextOptions<ApplicationDbContex> options):
        base(options)
    {
        Database.EnsureCreated();
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>().ToTable("Projects");
    }

}