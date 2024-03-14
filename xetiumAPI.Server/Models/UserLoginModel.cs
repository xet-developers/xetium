using System.ComponentModel.DataAnnotations;

namespace xetiumAPI.Models;

public class UserLoginModel
{
    [Required]
    [MinLength(5, ErrorMessage = "Min length must be 5 characters. ")]
    [MaxLength(20, ErrorMessage = "Max length must be 20 characters/")]
    public string UserName { get; set; }
    public string Password { get; set; }
}