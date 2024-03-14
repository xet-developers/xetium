using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;

namespace xetiumAPI.Models;

public class ProjectModelCreate
{
    [Required]
    [MaxLength(30)]
    [MinLength(1)]
    [RegularExpression(@"^[a-zA-Zа-яА-Я].*$")]
    public string Name { get; set; }
    
    [Required(ErrorMessage = "URL cannot be null or empty.")]
    [MaxLength(60)]
    public string Url { get; set; }
    
    [Required]
    [MaxLength(150)]
    public string Description { get; set; }
}