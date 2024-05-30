using Domain.Entity;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture;

public class ApplicationDbContext: DbContext
{
    public DbSet<Project> ProjectDbSet { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):
        base(options)
    {
    }
    
}