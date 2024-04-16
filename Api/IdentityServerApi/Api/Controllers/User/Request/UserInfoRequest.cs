namespace IdentityServerApi.Controllers.User.Request;

public class UserInfoRequest
{
    public string UserName { get; set; }
    
    public string Mail { get; set; }
    
    public DateTime DateTime { get; set; }
}