namespace ReportConnectionLib.ConnectionService.DtoModels.Request;

public class ReportDeleteRequest
{
    public required Guid UserId { get; set; }
    public required Guid ProjectId { get; set; }
}