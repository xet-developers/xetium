using xetiumAPI.ServerApp.Attributes;

namespace xetiumAPI.Models
{
    public class ReportInfoDto
    {
        [DateRange("LastDate")]
        public DateTime FirstDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
