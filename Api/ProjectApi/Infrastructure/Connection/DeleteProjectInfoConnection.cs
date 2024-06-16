using Domain.Interfaces;
using PositionConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.Interfaces;

namespace Infrastucture.Connection
{
    public class DeleteProjectInfoConnection : IDeleteProjectInfo
    {
        private IProjectConnectionService _connectionService;
        public DeleteProjectInfoConnection(IProjectConnectionService connectionService)
        {
            _connectionService = connectionService;
        }

        public async Task<bool> DeleteProjectInfoAsync(Guid projectId)
        {
            var res = await _connectionService.DeleteProjectInfoResponse(new DeleteProjectInfoRequestDto 
            {ProjectId = projectId});

            return res.State;
        }
    }
}
