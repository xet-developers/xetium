using Domain.Entity;
using System.ComponentModel.DataAnnotations;
using Core.Attributes;

namespace Api.Controllers.Request
{
    public class SearchDtoRequest
    {
        [MaxLength(60)]
        public required string URI { get; init; }

        [MaxLength(15)]
        [MinLength(1)]
        public required string[] Keywords { get; init; }

        public required int Top { get; init; } = 100;

        [ValidEnumValue(typeof(SearchSystem))]
        public required int SearchSystem { get; init; }
    }
}
