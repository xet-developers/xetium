using Domain.Entity;
using Domain.Interfaces;
using Medo;
using Microsoft.EntityFrameworkCore;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace Infrastructure.Connection;

public class PositionConnection: IScheduleTask
{
    private readonly IProjectConnectionService _positionConnection;
    private  readonly IStandartStore _standartStore;
    public PositionConnection(IProjectConnectionService positionConnection, IStandartStore standartStore)
    {
        _standartStore = standartStore;
        _positionConnection = positionConnection;

    }
    
    public async Task ScheduleTaskAsync(TaskDetails taskDetails)
    {
        var res = await _positionConnection.GetSitePosition(new PositionAnalysisRequestDto()
        {
            Keywords = taskDetails.Keywords,
            SearchSystem = taskDetails.SearchSystem,
            Top = taskDetails.Top,
            Url = taskDetails.Url 
        });

        var scheduleTaskDetails = new ScheduleTaskDetails()
        {
            ProjectID = taskDetails.ProjectID,
            DateTime = DateTime.Now.ToUniversalTime(),
            ScheduleTask = new ScheduleTask()
            {
                Id = new Uuid7().ToGuid(),
                UserId = taskDetails.UserId
            }
        };
        
        await _standartStore.CreateAsync(scheduleTaskDetails);

        foreach (var positionAnalysis in res.PositionAnalysisData)
        {
            var pos = new SitePosition()
           {
                ProjectId = taskDetails.ProjectID,
                Date = positionAnalysis.Date.ToUniversalTime(),
                Keyword = positionAnalysis.Keyword,
                Position = positionAnalysis.Position,
                SearchSystem = positionAnalysis.SearchSystem,
                ScheduleTaskDetailId = scheduleTaskDetails.Id
            };
            await _standartStore.CreateAsync(pos);
        }
    }
}