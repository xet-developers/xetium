using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace xetiumAPI.ServerApp.Dal;

[Table("keywordresult")]
public class KeywordResultDal
{
    [Key, Column("searchid",Order = 0), ForeignKey("SearchDal")]
    public Guid  SearchID { get; set; }

    [Key,Column("keywordid",Order = 1), ForeignKey("Keyword")]
    public Guid  KeywordID { get; set; }

    [Required]
    [Column("position")]
    public int Position { get; set; }
    
    [Required]
    [Column("text")]
    [MaxLength(255)]
    public string Text { get; set; }

    public SearchDal SearchDal { get; set; }
}
