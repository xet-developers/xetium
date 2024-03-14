using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Interfaces;

public interface IAnalysisService
{
    public Task<SearchesDto> GetPositionAsync(AnalysisData model, HttpClient client, Guid userID);
}

