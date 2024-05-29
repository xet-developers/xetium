using ExampleCore.BrokerLogic;
using ExampleCore.HttpLogic;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProfileConnectionLib.ConnectionServices;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace ProfileConnectionLib;

public static class PositionLibStartUp
{
    public static IServiceCollection TryAddPositionLib(this IServiceCollection serviceCollection, 
        IConfigurationManager configurationManager)
    {
        serviceCollection.AddScoped<IProjectConnectionService,ProjectConnectionService>();
        
        return serviceCollection;
    }
}