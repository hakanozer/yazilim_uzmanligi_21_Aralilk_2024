using System.ComponentModel.DataAnnotations;

namespace MVC.Dto.UserDto
{
    public class UserRegisterDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Surname { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password", ErrorMessage = "Şifreler uyuşmuyor!")]
        public string PasswordAgain { get; set; } = string.Empty;
    }
}