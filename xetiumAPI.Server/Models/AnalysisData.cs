using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using xetiumAPI.ServerApp.Attributes;

namespace xetiumAPI.Models
{
    public class AnalysisData
    {
        [Required]
        public Guid ProjId { get; set; }
        
        [Required]
        [MaxLength(60)]
        public string URI { get; set; }

        [Required]
        [MaxLength(15)]
        [MinLength(1)]
        public string[] Keywords { get; set; }

        public int Top { get; set; } = 100;
        
        [Required]
        [ValidEnumValue(typeof(SearchSystem))]
        public int SearchSystem { get; set; }
    }

    public enum SearchSystem
    {
        Yandex,
        Google
    }
}