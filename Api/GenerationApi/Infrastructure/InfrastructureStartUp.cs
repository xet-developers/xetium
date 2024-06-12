using Domain.Interfaces;
using ExampleCore.BrokerLogic;
using Infrastructure.Connection;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProfileConnectionLib.ConnectionServices;
using ProfileConnectionLib.ConnectionServices.Interfaces;

public static class InfrastuctureStartup
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection)
    {
        serviceCollection.TryAddScoped<IReportConnection, ReportConnection>();
        serviceCollection.TryAddScoped<IProjectConnectionService, ProjectConnectionService>();
        serviceCollection.TryAddScoped<IYandexGptConnection, YandexGptConnection>();
        return serviceCollection;
    }
}