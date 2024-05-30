using Domain.Interfaces;
using Infrastucture;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;


public static class InfrastructureStartUp
{
    public static IServiceCollection TryAddInfrastructure(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.AddScoped<IProjectStore, ProjectStore>();
        serviceCollection.TryAddScoped<IStandartStore, BaseRepository>();
        
        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        
        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        serviceCollection.AddScoped<DbContext>(provider => provider.GetService<ApplicationDbContext>());
        return serviceCollection;
    }
    
}