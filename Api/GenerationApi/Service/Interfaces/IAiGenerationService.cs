using Domain.Entity;


namespace Service.Interfaces
{
    public interface IAiGenerationService
    {
        public Task<FileStream> GetClusterQueriesUsingAiAsync(string query);

        public Task<Intents> GetAutoQueryGeneration(Query query);
    }
}
