using xetiumAPI.Models;

namespace xetiumAPI.ServerApp.Interfaces;
public interface IReportService
{
    public Task<FileStream> GetReportAsync(ReportInfoDto report, Guid userID);
}

