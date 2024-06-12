using Domain.Entity;

namespace Domain.Interfaces;

public interface IYandexGptConnection
{
    public Task<string> GetClusterQueriesAsync(string query);

    public Task<string> GetAutoQueryGeneration(Query query);
}