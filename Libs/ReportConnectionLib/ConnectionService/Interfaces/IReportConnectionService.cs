using ReportConnectionLib.ConnectionService.DtoModels.Request;
using ReportConnectionLib.ConnectionService.DtoModels.Response;

namespace ReportConnectionLib.ConnectionService.Interfaces;

public interface IReportConnectionService
{
    Task<ReportDeleteResponse> DeleteReportInfo(ReportDeleteRequest request);
}