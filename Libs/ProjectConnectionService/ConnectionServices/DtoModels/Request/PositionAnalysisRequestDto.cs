namespace ProfileConnectionLib.ConnectionServices.DtoModels.Request;

public record PositionAnalysisRequestDto
{
    public required string Url { get; set; }
    
    public required string[] Keywords { get; init; }

    public required int Top { get; init; } = 100;
    
    public required int SearchSystem { get; set; }
}