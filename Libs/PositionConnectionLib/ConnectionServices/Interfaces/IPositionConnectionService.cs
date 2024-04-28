
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;


namespace ProfileConnectionLib.ConnectionServices.Interfaces;

public interface IPositionConnectionService
{
    Task<PositionsAnalysisResponseDto> GetSitePosition(PositionAnalysisRequestDto request);
}