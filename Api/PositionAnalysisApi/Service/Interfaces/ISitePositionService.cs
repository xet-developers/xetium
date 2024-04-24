using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface ISitePositionService
    {
        public Task<List<SearchResult>> GetPositionAsync(SearchInfo model);
    }
}
