using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IClusteringService
    {
        public Task<FileStream> GetClusterQueriesUsingAiAsync(string query);
    }
}
