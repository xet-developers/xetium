using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace xetiumAPI.ServerApp.Dal.Models.Repository;


// Штучка как раз для соединения с нашей бд, аналог репозитория
public class ApplicationContextDb: IdentityDbContext<UserDal, IdentityRole<Guid>, Guid>
{

    public DbSet<UserDal> UserDbSet { get; set; }

    public  DbSet<SearchDal> SearchDbSet  {get; set; }
    public  DbSet<ProjectDal> ProjectDbSet  {get; set; }
    public DbSet<KeywordResultDal> KeywordResultDal { get; set; }

    public ApplicationContextDb(DbContextOptions<ApplicationContextDb> options):
        base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
          // проверит наличе бд и если нету создаст
     // optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<KeywordResultDal>().HasKey(k => new { k.SearchID, k.KeywordID });
    }
}