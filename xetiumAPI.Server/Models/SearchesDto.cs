using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Models;

public class SearchesDto
{
    public DateTime Date { get; set; }

    public string Type { get; set; }
    
    public List<KeywordResultDto> KeywordResults { get; set; }
}