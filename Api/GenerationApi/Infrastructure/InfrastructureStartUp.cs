using ExampleCore.BrokerLogic;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using ProfileConnectionLib.ConnectionServices;
using ProfileConnectionLib.ConnectionServices.Interfaces;

public static class InfrastuctureStartup
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection)
    {
        
        return serviceCollection;
    }
}