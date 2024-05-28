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
        serviceCollection.AddBrokerLogic();
        serviceCollection.AddMassTransit(x =>
        {
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.Host("localhost", "/", h =>
                {
                    h.Username("guest");
                    h.Password("guest");
                });
            });
            
        });
        
        return serviceCollection;
    }
}