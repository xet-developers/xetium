using CoreLib.HttpServiceV2.Services.Interfaces;
using ExampleCore.BrokerLogic.Services;
using ExampleCore.HttpLogic.Services;
using ExampleCore.HttpLogic.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ExampleCore.BrokerLogic;

public static class HttpServiceStartup
{

    public static IServiceCollection AddBrokerLogic(this IServiceCollection services)
    {
        
        services.TryAddKeyedTransient<IRequestService, ProducerRequestService>("broker");
        return services;
    }
}