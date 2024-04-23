using Domain.Interfaces;
using Infrastucture;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


public static class InfrastructureStartUp
{
    public static IServiceCollection TryAddInfrastructure(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.AddScoped<IProjectStore, ProjectStore>();
        
        
        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        
        serviceCollection.AddDbContext<ApplicationDbContex>(options =>
        {
            options.UseNpgsql(connectionString);
        });
        
        return serviceCollection;
    }
    
}