using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture;

public class ApplcationDbContext: IdentityDbContext<User,IdentityRole<Guid>,Guid>
{
    
    public ApplcationDbContext(DbContextOptions options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}