namespace Domain.Entity;

public class Intents
{
        public List<string> Comparison { get; set; } = new (); 
        public List<string> Informational { get; set; } = new ();
        public List<string> Navigational { get; set; } = new (); 
        public List<string> Transactional { get; set; } = new ();
        public bool Status { get; set; }
}