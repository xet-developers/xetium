using Microsoft.Extensions.DependencyInjection;
using Service;
using Service.Interfaces;

public static class ServiceStartUp
{
    public static IServiceCollection TryAddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ISitePositionService, SitePositionService>();
        return serviceCollection;
    }

}