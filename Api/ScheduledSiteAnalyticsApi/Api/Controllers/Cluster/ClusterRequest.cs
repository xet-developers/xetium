namespace Api.Controllers.Cluster
{
    public class ClusterRequest
    {
        public required Guid ProjectId { get; set; }
        public required string[] Keywords { get; set; }
    }
}
