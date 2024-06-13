namespace Domain.Entity;

public record Query
{
    public string Keywords { get; set; }
    public int NumberOfGeneratedWords { get; set; }
    public IntentType Intent { get; set; }
}