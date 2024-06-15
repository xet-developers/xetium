using Domain.Interfaces;
using ExampleCore.BrokerLogic;
using Infrastructure;
using Infrastructure.Connection;
using Infrastructure.Data;
using Infrastucture.Data;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProfileConnectionLib.ConnectionServices;
using ProfileConnectionLib.ConnectionServices.Interfaces;

public static class InfrastuctureStartup
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.TryAddScoped<IReportConnection, ReportConnection>();
        serviceCollection.TryAddScoped<IReportRepository, ReportRepository>(); 
        serviceCollection.TryAddScoped<IProjectConnectionService, ProjectConnectionService>();
        serviceCollection.TryAddScoped<IYandexGptConnection, YandexGptConnection>();
        serviceCollection.TryAddScoped<IStandartStore, BaseRepository>();
        var connectionString = configurationManager.GetConnectionString("DefaultConnection");
        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        serviceCollection.AddScoped<DbContext>(provider => provider.GetService<ApplicationDbContext>());
        return serviceCollection;
    }
}