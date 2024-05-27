using Core.Attributes;

namespace Api.Controllers.Clustering.Request
{
    public class ClusteringRequest
    {
        [CommaSeparated]
        public string Query { get; set; }
    }
}
