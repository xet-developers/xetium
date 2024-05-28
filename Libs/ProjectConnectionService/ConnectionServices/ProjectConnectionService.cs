

using System.Net;
using CoreLib.HttpServiceV2.Services.Interfaces;
using ExampleCore.HttpLogic.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace ProfileConnectionLib.ConnectionServices;

public class ProjectConnectionService : IProjectConnectionService
{
    private readonly IRequestService _clientFactory;
    
    public ProjectConnectionService(IConfiguration configuration, IServiceProvider serviceProvider)
    { 
        var connectionType = configuration.GetSection("ConnectionSettings")["Type"];
        _clientFactory = serviceProvider.GetKeyedService<IRequestService>(connectionType) ?? throw new InvalidOperationException();
    }
    
    public async Task<PositionsAnalysisResponseDto> GetSitePosition(PositionAnalysisRequestDto request)
    {
        var requestData = new RequestData()
        {
            ContentType = ContentType.ApplicationJson,
            Body = request
        };
        
        var client = 
            await _clientFactory.SendRequestAsync<PositionsAnalysisResponseDto,PositionAnalysisRequestDto>(requestData);
        
        if (client.StatusCode >= (HttpStatusCode)400)
        {
            throw new Exception("UwU");
        }
        
        return client.Body;
    }

    public async Task<UserSearchesResponseDto> GetReportInfoOrDefault(UserSearchesRequestDto request)
    {
        var requestData = new RequestData()
        {
            ContentType = ContentType.ApplicationJson,
            Body = request
        };

        var client =
            await _clientFactory.SendRequestAsync<UserSearchesResponseDto, UserSearchesRequestDto>(requestData);
        
        return (client.StatusCode >= (HttpStatusCode)400 ? null : client.Body)!;
    }
}
