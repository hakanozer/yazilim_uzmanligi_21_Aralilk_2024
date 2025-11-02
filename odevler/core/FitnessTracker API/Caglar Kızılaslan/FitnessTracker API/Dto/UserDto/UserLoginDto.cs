using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace FitnessTracker_API.Dto.UserDto
{
    [SwaggerSchema(Title = "Kullanıcı Giriş")]
    public class UserLoginDto
    {


        [Required]
        [EmailAddress]
        [MaxLength(250)]
        [MinLength(6)]
        [SwaggerSchema(Description = "Kullanıcı e-posta adresi")]
        public string Email { get; set; } = "veli@mail.com";


        [Required]
        [MaxLength(12)]
        [MinLength(5)]
        [SwaggerSchema(Description = "Kullanıcı şifresi")]
        public string Password { get; set; } = "123456";

    }
}