using ExampleCore.BrokerLogic;
using ExampleCore.HttpLogic;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProfileConnectionLib.ConnectionServices;
using ProfileConnectionLib.ConnectionServices.DtoModels.CheckUserExists;
using ProfileConnectionLib.ConnectionServices.DtoModels.UserNameLists;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace ProfileConnectionLib;

public static class ProfileLibStartUp
{
    public static IServiceCollection TryAddProfileLib(this IServiceCollection serviceCollection)
    {
        serviceCollection.TryAddScoped<IProfileConnectionServcie, ProfileConnectionService>();
        serviceCollection.AddBrokerLogic();
        return serviceCollection;
    }
}