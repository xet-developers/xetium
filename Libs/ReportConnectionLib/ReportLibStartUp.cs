using Microsoft.Extensions.DependencyInjection;
using ReportConnectionLib.ConnectionService;
using ReportConnectionLib.ConnectionService.Interfaces;

namespace ReportConnectionLib;

public static class ReportLibStartUp
{
    public static IServiceCollection TryAddReportLib(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IReportConnectionService,ReportConnectionService>();
        return serviceCollection;
    }
}