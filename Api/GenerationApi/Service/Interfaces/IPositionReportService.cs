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
        public Task<FileStream> GetPositionReportAsync(ReportInfo reportInfo, Guid UserId);
    }
}
