using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace xetiumAPI.ServerApp.Dal;

[Table("users")]
public class UserDal : IdentityUser<Guid>
{
    [Required]
    [MaxLength(255)]
    [Column("name")]
    public string Name { get; set; }
    
    public List<ProjectDal> Projects { get; set; }
}