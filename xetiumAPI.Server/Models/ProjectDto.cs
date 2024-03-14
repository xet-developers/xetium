using xetiumAPI.ServerApp.Dal;

namespace xetiumAPI.Models;

public class ProjectDto
{ 
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Url { get; set; }
        public string Description { get; set; }
        public List<SearchesDto> Searches { get; set; }
}