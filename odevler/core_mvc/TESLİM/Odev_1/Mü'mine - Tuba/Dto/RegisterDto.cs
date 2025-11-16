using System.ComponentModel.DataAnnotations;

namespace MVC.Dto
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "İsim alanı zorunludur.")]
        [Display(Name = "Name")]
        [MinLength(3, ErrorMessage = "İsim en az 3 karakter olmalıdır.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Soyisim alanı zorunludur.")]
        [Display(Name = "Surname")]
        [MinLength(3, ErrorMessage = "Soyisim en az 3 karakter olmalıdır.")]
        public string Surname { get; set; } = string.Empty;

        [Required(ErrorMessage = "E-posta alanı zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçersiz e-posta adresi.")]
        [Display(Name = "Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre alanı zorunludur.")]
        [DataType(DataType.Password)] 
        [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalıdır.")]
        [Display(Name = "Password")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$", 
        ErrorMessage = "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.")]
        public string Password { get; set; } = string.Empty;

    } 
}