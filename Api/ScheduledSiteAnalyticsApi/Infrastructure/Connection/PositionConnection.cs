using Domain.Entity;
using Domain.Interfaces;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace Infrastructure.Connection;

public class PositionConnection: IScheduleTask
{
    private IPositionConnectionService _positionConnection;
    
    public PositionConnection(IPositionConnectionService positionConnection)
    {
        _positionConnection = positionConnection;
    }
    
    public async Task ScheduleTask(TaskDetails taskDetails)
    {
       var res= await _positionConnection.GetSitePosition(new PositionAnalysisRequestDto()
        {
            Keywords = taskDetails.Keywords,
            SearchSystem = taskDetails.SearchSystem,
            Top = taskDetails.Top,
            Url = taskDetails.Url 
        });
       
       //todo написать сохранение  в бд
    }
}