using Domain.Entities;
using ExampleCore.AuthOptions;
using Infrastucture;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;


public static class ServiceStartUp
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = true;
            })
            .AddEntityFrameworkStores<ApplicationDbContex>()
            .AddDefaultTokenProviders();
        serviceCollection.AddAuth();

        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        
        serviceCollection.AddDbContext<ApplicationDbContex>(options =>
        {
            options.UseNpgsql(connectionString);
        });
        
        return serviceCollection;
    }
    
}