using System.ComponentModel.DataAnnotations;

namespace MVC.Dto.UserDto
{
    public class UserRegisterDto
    {
        [Required]
        [MaxLength(50)]
        [MinLength(2)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [MinLength(2)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [MaxLength(250)]
        [MinLength(6)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(12)]
        [MinLength(5)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$")]
        public string Password { get; set; } = string.Empty; 
    }
}