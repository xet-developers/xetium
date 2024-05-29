namespace ProfileConnectionLib.ConnectionServices.DtoModels.Response;

public class PositionsAnalysisResponseDto
{
    public required List<PositionAnalysis> PositionAnalysisData { get; set; }
}


public class PositionAnalysis
{
    public required DateTime Date { get; init; }

    public required string Keyword { get; init; }

    public required int Position { get; init; }

    public required int SearchSystem { get; init; }
    public required bool IsCompleted { get; init;}
}