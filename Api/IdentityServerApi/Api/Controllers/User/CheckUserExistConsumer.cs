using MassTransit;
using ProfileConnectionLib.ConnectionServices.DtoModels.CheckUserExists;
using Services.Interfaces;

namespace IdentityServerApi.Controllers.User;

public class CheckUserExistConsumer : IConsumer<CheckUserExistProfileApiRequest>
{
    private readonly IUserService _userLogicManager;

    public CheckUserExistConsumer(IUserService userLogicManager)
    {
        _userLogicManager = userLogicManager;
    }
    
    public async Task Consume(ConsumeContext<CheckUserExistProfileApiRequest> context)
    {
        var result = await _userLogicManager.CheckExistAsync(context.Message.UserId);
        
        var response = new CheckUserExistProfileApiResponse
        {
            UserId = result
        };
        
        await context.RespondAsync(response);
    }
}