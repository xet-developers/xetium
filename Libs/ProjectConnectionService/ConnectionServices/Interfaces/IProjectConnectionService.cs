
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;


namespace ProfileConnectionLib.ConnectionServices.Interfaces;

public interface IProjectConnectionService
{
    Task<PositionsAnalysisResponseDto> GetSitePosition(PositionAnalysisRequestDto request);

    Task<UserSearchesResponseDto> GetReportInfoOrDefault(UserSearchesRequestDto request);
}