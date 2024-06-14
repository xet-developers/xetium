using Core.Attributes;

namespace Api.Controllers.PositionReport
{
    public class ReportRequest
    {
        public Guid ClusterId { get; set; }
        public Guid ProjectId { get; set; }

        [DateRange("LastDate")]
        public DateTime FirstDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
