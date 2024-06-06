namespace ProjectApi.Controllers.Project.Request;

public record ProjectUpdateRequest: ProjectCreateRequest
{
    public Guid Id { get; set; }
}