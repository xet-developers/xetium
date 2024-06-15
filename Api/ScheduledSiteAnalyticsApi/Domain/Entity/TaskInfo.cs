using ExampleCore.Dal.Base;

namespace Domain.Entity;

public record TaskInfo: BaseEntity<Guid>
{
    
    public required Guid UserId { get; set; }
    
    public required Guid ClusterId { get; set; }
    public required Guid ProjectId { get; set; }
    
    public required bool IsCompleted { get; set; }
    
    public required DateTime CompletionTime { get; set; }
    
}