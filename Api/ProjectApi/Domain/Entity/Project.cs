using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ExampleCore.Dal.Base;
using Newtonsoft.Json;

namespace Domain.Entity;


[Table("project")]
public record Project: BaseEntity<Guid>
{
    [Column("name")]
    public required string Name { get; set; }


    [Column("url")]
    public required string Url { get; set; }

    [Column("description")]
    public required string Description { get; set; }

    [Column("userId")]
    [JsonIgnore]
    public required Guid UserId { get; set; }
}