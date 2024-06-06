namespace ProjectApi.Controllers.Project.Request;

public record ProjectUpdateRequest: ProjectCreateRequest
{
    public  required Guid Id { get; set; }
}