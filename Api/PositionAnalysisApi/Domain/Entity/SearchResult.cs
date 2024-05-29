using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class SearchResult
    {
        public required DateTime Date { get; init; }

        public required string Keyword { get; init; }

        public required int Position { get; init; }

        public required int SearchSystem { get; init; }
    }
}
