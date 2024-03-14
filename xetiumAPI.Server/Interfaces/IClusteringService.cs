namespace xetiumAPI.ServerApp.Interfaces;

public interface IClusteringService
{
    public Task<FileStream> GetClusterQueriesUsingAiAsync(string query);
}