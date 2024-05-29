using CoreLib.HttpServiceV2.Services.Interfaces;
using ExampleCore.HttpLogic.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Retry;
using ProfileConnectionLib.ConnectionServices.DtoModels.CheckUserExists;
using ProfileConnectionLib.ConnectionServices.DtoModels.UserNameLists;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace ProfileConnectionLib.ConnectionServices;

public class ProfileConnectionService : IProfileConnectionServcie
{
    private readonly IRequestService _httpClientFactory;
    
    public ProfileConnectionService(IConfiguration configuration, IServiceProvider serviceProvider)
    { 
        var connectionType = configuration.GetSection("ConnectionSettings")["Type"];
        _httpClientFactory = serviceProvider.GetKeyedService<IRequestService>(connectionType) ?? throw new InvalidOperationException();
    }
    public async Task<UserNameListProfileApiResponse[]> GetUserNameListAsync(UserNameListProfileApiRequest request)
    {
        var requestData = new RequestData()
        {
            Uri = new Uri("http://localhost:5097/api/user/namelist"),
            Method = HttpMethod.Post,
            ContentType = ContentType.ApplicationJson,
            Body = request
        };
        
        var client = await _httpClientFactory.SendRequestAsync<UserNameListProfileApiResponse[], 
            UserNameListProfileApiRequest>(requestData);
        
        return client.Body;
    }
    
    public async Task<CheckUserExistProfileApiResponse> CheckUserExistAsync(CheckUserExistProfileApiRequest checkUserExistProfileApiRequest)
    {
        var requestData = new RequestData()
        {
             Uri = new Uri("http://localhost:5097/api/user/exist"),
            Method = HttpMethod.Post,
            ContentType = ContentType.ApplicationJson,
            Body = checkUserExistProfileApiRequest,
        };
        
        var client = await _httpClientFactory.SendRequestAsync<CheckUserExistProfileApiResponse,
            CheckUserExistProfileApiRequest>(requestData);

        return client.Body.UserId != Guid.Empty ? client.Body : throw new Exception("user not found");
    }
}
