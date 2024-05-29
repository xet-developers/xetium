using Domain.Entity;
using MassTransit;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
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
        var res = await _scheduleService.GetCompletedTasksInfoAsync(new UserSearchInfo()
        {
            UserId = info.UserId,
            FirstDate = info.FirstDate,
            LastDate = info.LastDate,
            ProjectId = info.ProjectId
        });

        await context.RespondAsync(res);
    }
}