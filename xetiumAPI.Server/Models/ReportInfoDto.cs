using xetiumAPI.ServerApp.Attributes;

namespace xetiumAPI.Models
{
    public class ReportInfoDto
    {
        public Guid ProjID { get; set; }
        [DateRange("LastDate")]
        public DateTime FirstDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
