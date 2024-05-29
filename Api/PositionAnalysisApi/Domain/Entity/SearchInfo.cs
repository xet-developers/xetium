using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class SearchInfo
    {
            public required string URI { get; init; }

            public required string[] Keywords { get; init; }

            public required int Top { get; init; } = 100;

            public required int SearchSystem { get; init; }
    }

    public enum SearchSystem
    {
        Yandex,
        Google
    }
}
