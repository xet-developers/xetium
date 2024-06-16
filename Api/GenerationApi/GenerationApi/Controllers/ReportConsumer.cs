using MassTransit;
using ReportConnectionLib.ConnectionService.DtoModels.Request;
using ReportConnectionLib.ConnectionService.DtoModels.Response;
using Service.Interfaces;

namespace Api.Controllers;

public class ReportConsumer: IConsumer<ReportDeleteRequest>
{
    private readonly IPositionReportService _positionReportService;
    
    public ReportConsumer(IPositionReportService positionReportService)
    {
        _positionReportService = positionReportService;
    }
    
    public async Task Consume(ConsumeContext<ReportDeleteRequest> context)
    {
        var info = context.Message;

        var res = await _positionReportService.DeleteUsersReportInfo(info.ProjectId, info.UserId);

        await context.RespondAsync(new ReportDeleteResponse()
        {
            State = res
        });
    }
}