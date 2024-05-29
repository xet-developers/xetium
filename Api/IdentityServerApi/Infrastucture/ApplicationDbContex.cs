using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture;

public class ApplicationDbContex: IdentityDbContext<User,IdentityRole<Guid>,Guid>
{
    
    public ApplicationDbContex(DbContextOptions options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}