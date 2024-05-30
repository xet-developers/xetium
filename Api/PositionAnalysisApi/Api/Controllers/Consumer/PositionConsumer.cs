using Domain.Entity;
using MassTransit;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;
using Service.Interfaces;

namespace Api.Controllers.Response.Consumer;

public class PositionConsumer: IConsumer<PositionAnalysisRequestDto>
{

    private readonly ISitePositionService _sitePositionService;

    public PositionConsumer(ISitePositionService sitePositionService)
    {
        _sitePositionService = sitePositionService;
        
    }

    public async Task Consume(ConsumeContext<PositionAnalysisRequestDto> context)
    {
        var message = context.Message;

        var position = await _sitePositionService.GetPositionAsync(new SearchInfo()
        {
            Keywords = message.Keywords,
            SearchSystem = message.SearchSystem,
            Top = message.Top,
            URI = message.Url
        });

        await context.RespondAsync(new PositionsAnalysisResponseDto
        {
            PositionAnalysisData = position.Select(r => new PositionAnalysis()
                {
                    Date = r.Date,
                    Keyword = r.Keyword,
                    Position = r.Position,
                    SearchSystem = r.SearchSystem,
                    IsCompleted = true
                })
                .ToList(),
        });
    }
}
