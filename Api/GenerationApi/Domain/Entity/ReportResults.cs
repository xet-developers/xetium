using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class ReportResults
    {
        public Guid ReportId { get; set; }
        public DateTime Date {  get; set; }
        public ReportType ReportType { get; set; }
        public DateTime FirstDate { get; set; }
        public DateTime LastDate { get; set; }
    }

    public enum ReportType
    {
        Standart
    }
}
