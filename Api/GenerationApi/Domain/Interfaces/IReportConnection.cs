using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;

namespace Domain.Interfaces;

public interface IReportConnection
{
    public Task<UserSearchesResponseDto> GetReportInfo(UserSearchesRequestDto request);
}