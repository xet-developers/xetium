using System.Net;
using CoreLib.HttpServiceV2.Services.Interfaces;
using ExampleCore.HttpLogic.Services;
using ReportConnectionLib.ConnectionService.DtoModels.Request;
using ReportConnectionLib.ConnectionService.DtoModels.Response;
using ReportConnectionLib.ConnectionService.Interfaces;

namespace ReportConnectionLib.ConnectionService;

public class ReportConnectionService: IReportConnectionService
{
    private readonly IRequestService _requestService;
    
    public ReportConnectionService(IRequestService requestService)
    {
        _requestService = requestService;
    }
    
    public async Task<ReportDeleteResponse> DeleteReportInfo(ReportDeleteRequest request)
    {
        var requestData = new RequestData()
        {
            ContentType = ContentType.ApplicationJson,
            Body = request
        };
        
        var client = 
            await _requestService.SendRequestAsync<ReportDeleteResponse,ReportDeleteRequest>(requestData);
        
        if (client.StatusCode >= (HttpStatusCode)400)
        {
            return new ReportDeleteResponse()
            {
                State = false
            };
        }
        
        return client.Body;
    }
}