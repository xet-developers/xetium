using Domain.Interfaces;
using ExampleCore.HttpLogic;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


public static class InfrastructureStartUp
{
    public static IServiceCollection TryAddInfrastructure(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ISiteInfo, SiteInfo>();
        serviceCollection.AddHttpRequestService();
        
        return serviceCollection;
    }
}