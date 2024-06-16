using Domain.Interfaces;
using Infrastucture;
using Infrastucture.Connection;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProfileConnectionLib;


public static class InfrastructureStartUp
{
    public static IServiceCollection TryAddInfrastructure(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.AddScoped<IProjectStore, ProjectStore>();
        serviceCollection.TryAddScoped<IStandartStore, BaseRepository>();
        serviceCollection.TryAddPositionLib(configurationManager);
        serviceCollection.TryAddScoped<IDeleteProjectInfo, DeleteProjectInfoConnection>();

        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        
        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        serviceCollection.AddScoped<DbContext>(provider => provider.GetService<ApplicationDbContext>());
        return serviceCollection;
    }
    
}