using Api.Controllers;
using Api.Controllers.Consumers;
using MassTransit;

namespace Api;

public static class BrokerStartUp
{
    public static IServiceCollection AddBroker(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddMassTransit(x =>
        {
            x.AddConsumer<DeleteProjectInfoConsumer>();
            x.AddConsumer<GetCompletedTasksConsumer>();
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.Host("xetium-rabbitmq-service", "/", h =>
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