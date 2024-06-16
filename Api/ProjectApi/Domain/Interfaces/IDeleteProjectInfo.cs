
namespace Domain.Interfaces
{
    public interface IDeleteProjectInfo
    {
        public Task<bool> DeleteProjectInfoAsync(Guid projectId);
    }
}
