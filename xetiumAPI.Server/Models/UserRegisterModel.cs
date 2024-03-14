using System.ComponentModel.DataAnnotations;

namespace xetiumAPI.Models
{
    public class UserRegisterModel
    {
        [Required]
        [MinLength(5, ErrorMessage = "Min length must be 5 characters. ")]
        [MaxLength(20, ErrorMessage = "Max length must be 20 characters/")]
        public string UserName { get; set; }

        [MinLength(5, ErrorMessage = "Min length must be 5 characters. ")]
        [MaxLength(20, ErrorMessage = "Max length must be 20 characters/")]
        public string Name { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
        public bool CheckboxData { get; set; }
        public bool CheckboxConf { get; set; }
        public bool CheckboxSpam { get; set; }
    }
}
