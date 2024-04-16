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
            .AddEntityFrameworkStores<ApplcationDbContext>()
            .AddDefaultTokenProviders();
        
        serviceCollection.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = AuthOptions.AUDIENCE,
                ValidIssuer = AuthOptions.ISSUER,
                RequireExpirationTime = true,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey()
            };
        });
        serviceCollection.AddAuthorization();


        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        
        serviceCollection.AddDbContext<ApplcationDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });
        
        return serviceCollection;
    }
    
}