using System.ComponentModel.DataAnnotations;

namespace ProjectApi.Controllers.Project.Request;

public record ProjectCreateRequest
{
    [MaxLength(30)]
    [MinLength(1)]
    [RegularExpression(@"^[a-zA-Zа-яА-Я].*$")]
    public required string Name { get; set; }
    
    [MaxLength(60)]
    public required string Url { get; set; }
    
    [MaxLength(150)]
    public required string Description { get; set; }
}