using System.ComponentModel.DataAnnotations;

namespace FitnessTracker_API.Dto.UserDto
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
        [EmailAddress]
        [MaxLength(250)]
        [MinLength(6)]
        public string Email { get; set; } = string.Empty;


        [Required]
        [MaxLength(12)]
        [MinLength(5)]
        public string Password { get; set; } = string.Empty;

    }
}