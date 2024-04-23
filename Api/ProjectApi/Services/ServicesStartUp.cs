
using Microsoft.Extensions.DependencyInjection;
using Services.Interfaces;
using Services.Services;

public static class ServiceStartUp
{
    public static IServiceCollection TryAddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IProjectService, ProjectService>();
        return serviceCollection;
    }
    
}