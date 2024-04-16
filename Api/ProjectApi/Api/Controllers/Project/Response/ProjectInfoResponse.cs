namespace ProjectApi.Controllers.Project.Response;

public record ProjectInfoResponse
{
    public required Guid Id { get; set; }
    public required string Name { get; set; } 
    public required string Url { get; set; }
    public required string Description { get; set; }
}