using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ExampleCore.Dal.Base;

namespace Domain.Entity;

public record Project: BaseEntity<Guid>
{
    [MaxLength(255)]
    [Column("name")]
    public required string Name { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("url")]
    public required string URL { get; set; }

    [MaxLength(1000)]
    [Column("description")]
    public required string Description { get; set; }

    [Required]
    [Column("userId")]
    public required Guid UserID { get; set; }
}