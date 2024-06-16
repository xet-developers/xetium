﻿using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IReportRepository
    {
        public Task<List<ReportInfo>> GetAllReportsInfo(Guid projectId, Guid userId);

        public Task<bool> DeleteReportInfo(Guid userId, Guid projectId);
    }
}
