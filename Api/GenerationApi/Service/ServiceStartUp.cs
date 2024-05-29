using Microsoft.Extensions.DependencyInjection;
using Service.Interfaces;
using Service.Services;
using Microsoft.Extensions.DependencyInjection.Extensions;

public static class ServiceStartUp
{
    public static IServiceCollection TryAddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.TryAddScoped<IClusteringService, ClusteringService>();
        serviceCollection.TryAddScoped<IPositionReportService, PositionReportService>();
        return serviceCollection;
    }
}