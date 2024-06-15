using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IPositionReportService
    {
        public Task<List<ReportResults>> GetAllReportsInfo(Guid userId, Guid projectId);
        public Task<FileStream> GetPositionReportAsync(ReportInfo reportInfo, Guid UserId);
        public Task<FileStream> GetCompletedReportAsync(Guid Id, Guid userId);
    }
}
