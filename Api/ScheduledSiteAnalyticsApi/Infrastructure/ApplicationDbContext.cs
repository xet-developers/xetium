using Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure;

public class ApplicationDbContext: DbContext
{
    public DbSet<ScheduleTask> ScheduleTask { get; set; }
    public DbSet<ScheduleTaskDetails> ScheduleTaskDetails {  get; set; }
    public DbSet<SitePosition> SitePositions { get; set; }
    public DbSet<TaskDetails> TaskDetails { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ScheduleTask>()
            .HasMany(st => st.Details) 
            .WithOne(std => std.ScheduleTask) 
            .HasForeignKey(std => std.Id);

        modelBuilder.Entity<ScheduleTaskDetails>()
            .HasMany(std => std.PositionAnalysis)
            .WithOne(pa => pa.ScheduleTaskDetails)
            .HasForeignKey(pa => pa.ScheduleTaskDetailId);
    }
}