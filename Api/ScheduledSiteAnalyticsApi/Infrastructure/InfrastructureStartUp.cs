using Domain.Interfaces;
using Hangfire;
using Hangfire.PostgreSql;
using Infrastructure;
using Infrastructure.Connection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

public static class InfrastuctureStartUp
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.TryAddScoped<IScheduleTask, PositionConnection>();    

        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        serviceCollection.AddHangfire(config =>
                config.UsePostgreSqlStorage(a => a.UseNpgsqlConnection(configurationManager.GetConnectionString("HangfireConnection"))));

        serviceCollection.AddHangfireServer();
        
        return serviceCollection;
    }
}