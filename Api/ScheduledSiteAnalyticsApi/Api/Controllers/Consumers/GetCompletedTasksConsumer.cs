using Domain.Entity;
using MassTransit;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;
using Services.Interfaces;

namespace Api.Controllers;


public class GetCompletedTasksConsumer: IConsumer<UserSearchesRequestDto>
{
    private readonly IScheduleService _scheduleService;
    public GetCompletedTasksConsumer(IScheduleService scheduleService)
    {
        _scheduleService = scheduleService;
    }
    
    public async Task Consume(ConsumeContext<UserSearchesRequestDto> context)
    {
        var info = context.Message;
        var res = await _scheduleService.GetReportInfoAsync(new UserSearchInfo()
        {
            UserId = info.UserId,
            FirstDate = info.FirstDate,
            ClusterId = info.ClusterId,
            LastDate = info.LastDate,
            ProjectId = info.ProjectId
        });
        
        var positionAnalyses = res.Select(sp => new PositionAnalysis
        {
            Date = sp.Date,
            Keyword = sp.Keyword,
            Position = sp.Position,
            SearchSystem = sp.SearchSystem,
            IsCompleted = true
        }).ToList();
        
        await context.RespondAsync(new UserSearchesResponseDto()
        {
            PositionAnalysisData = positionAnalyses
        });
        
    }
}