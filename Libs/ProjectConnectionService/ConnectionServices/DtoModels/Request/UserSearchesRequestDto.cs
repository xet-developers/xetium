namespace ProfileConnectionLib.ConnectionServices.DtoModels.Request;

public record UserSearchesRequestDto
{
    public required Guid UserId { get; set; }
    public required Guid ProjectId { get; set; }
    
    public required DateTime FirstDate { get; set; }
    public required DateTime LastDate { get; set; }
}