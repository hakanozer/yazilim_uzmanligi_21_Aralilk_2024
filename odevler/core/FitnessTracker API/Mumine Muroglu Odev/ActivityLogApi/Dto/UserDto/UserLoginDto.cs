using System.ComponentModel.DataAnnotations;

namespace ActivityLogApi.Dto.UserDto
{
    public class UserLoginDto
    {
        

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