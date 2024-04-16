using System.ComponentModel.DataAnnotations;

namespace IdentityServerApi.Controllers.User.Request;

public class UserLoginRequest
{
    [Required]
    [MinLength(5, ErrorMessage = "Min length must be 5 characters. ")]
    [MaxLength(20, ErrorMessage = "Max length must be 20 characters")]
    public string UserName { get; set; }
    
    public string Password { get; set; }
}