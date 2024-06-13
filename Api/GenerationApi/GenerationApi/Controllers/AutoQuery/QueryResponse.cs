namespace Api.Controllers;

public record QueryResponse
{
    public required List<string> Comparison { get; set; } = new (); 
    public required List<string> Informational { get; set; } = new ();
    public required List<string> Navigational { get; set; } = new (); 
    public required List<string> Transactional { get; set; } = new ();
}