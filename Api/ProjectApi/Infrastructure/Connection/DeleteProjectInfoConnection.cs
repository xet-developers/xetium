using Domain.Interfaces;
using PositionConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.Interfaces;
using ReportConnectionLib.ConnectionService.DtoModels.Request;
using ReportConnectionLib.ConnectionService.Interfaces;

namespace Infrastucture.Connection
{
    public class DeleteProjectInfoConnection : IDeleteProjectInfo
    {
        private readonly IProjectConnectionService _connectionService;
        private readonly IReportConnectionService _reportConnectionService;
        public DeleteProjectInfoConnection(IProjectConnectionService connectionService, IReportConnectionService reportConnectionService)
        {
            _connectionService = connectionService;
            _reportConnectionService = reportConnectionService;
        }

        public async Task<bool> DeleteProjectInfoAsync(Guid projectId, Guid userId)
        {
            var res = await _connectionService.DeleteProjectInfoResponse(new DeleteProjectInfoRequestDto 
            {ProjectId = projectId});

            var deleteReports = _reportConnectionService.DeleteReportInfo(new ReportDeleteRequest()
            {
                ProjectId = projectId,
                UserId = userId
            });
            
            return res.State;
        }
    }
}
