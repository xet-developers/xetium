using Api.Controllers;
using MassTransit;

namespace Api;

public static class BrokerStartUp
{
    public static IServiceCollection AddBroker(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddMassTransit(x =>
        {
            x.AddConsumer<GetCompletedTasksConsumer>();
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.Host("localhost", "/", h =>
                {
                    h.Username("guest");
                    h.Password("guest");
                });
                cfg.ConfigureEndpoints(context);
            });
        });

        return serviceCollection;
    }
}