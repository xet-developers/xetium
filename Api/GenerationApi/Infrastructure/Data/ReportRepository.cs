using Domain.Entity;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ReportRepository : IReportRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ReportRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<ReportInfo>> GetAllReportsInfo(Guid projectId, Guid userId)
        {
            var res = await _applicationDbContext.ReportInfo.Where(report => report.UserId == userId && report.ProjectId == projectId).ToListAsync();
            return res;
        }

        public async Task<bool> DeleteReportInfo(Guid userId, Guid projectId)
        {
            var reports = await GetAllReportsInfo(projectId, userId);

            _applicationDbContext.ReportInfo.RemoveRange(reports);

            return true;
        }
    }
}
