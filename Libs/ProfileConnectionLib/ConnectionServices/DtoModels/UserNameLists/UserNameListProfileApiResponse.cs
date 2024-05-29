namespace ProfileConnectionLib.ConnectionServices.DtoModels.UserNameLists;

public record UserNameListProfileApiResponse
{
    public required UserList UserList { get; set; }
}


public record UserList
{
    public required string Name { get; init; }
    
    public required Guid UserId { get; init; }
}