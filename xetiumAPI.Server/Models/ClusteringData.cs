using xetiumAPI.ServerApp.Attributes;

namespace xetiumAPI.Models;

public class ClusteringData
{
    [CommaSeparated]
    public string Query { get; set; }
}