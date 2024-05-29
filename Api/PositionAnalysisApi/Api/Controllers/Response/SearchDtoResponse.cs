using Domain.Entity;

namespace Api.Controllers.Response
{
    public class SearchDtoResponse
    {
        public required DateTime Date { get; init; }

        public required string Keyword { get; init; }

        public required int Position { get; init; }

        public required int SearchSystem { get; init; }
    }
}
