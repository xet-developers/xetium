using Domain.Entity;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture;

public class ApplicationDbContex: DbContext
{
    public DbSet<Project> ProjectDbSet { get; set; }
    
    public ApplicationDbContex(DbContextOptions<ApplicationDbContex> options):
        base(options)
    {
        Database.EnsureCreated();
    }
    
}