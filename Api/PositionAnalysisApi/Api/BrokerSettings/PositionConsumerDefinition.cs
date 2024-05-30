using Api.Controllers.Response.Consumer;
using MassTransit;

namespace Api;

public class PositionConsumerDefinition : ConsumerDefinition<PositionConsumer>
{
    public PositionConsumerDefinition()
    {
        ConcurrentMessageLimit = 10;
    }
}