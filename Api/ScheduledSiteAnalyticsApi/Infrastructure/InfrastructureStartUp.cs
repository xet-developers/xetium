using Domain.Interfaces;
using ExampleCore.HttpLogic;
using Hangfire;
using Hangfire.PostgreSql;
using Infrastructure;
using Infrastructure.Connection;
using Infrastructure.Data;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using ProfileConnectionLib;

public static class InfrastuctureStartUp
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.TryAddScoped<IScheduleTask, PositionConnection>();
        serviceCollection.TryAddPositionLib(configurationManager);
        serviceCollection.AddHttpRequestService();
        serviceCollection.TryAddScoped<ITasksInfoRepository, TaskInfoRepository>();
        
        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString).LogTo(Console.WriteLine, LogLevel.Information));

        serviceCollection.TryAddScoped<IStandartStore, BaseRepository>();
        connectionString = configurationManager.GetConnectionString("HangfireConnection");
        serviceCollection.AddHangfire(config =>
            config.UsePostgreSqlStorage(connectionString));
        serviceCollection.AddScoped<DbContext>(provider => provider.GetService<ApplicationDbContext>());

        serviceCollection.AddHangfireServer();
        
        return serviceCollection;
    }
}