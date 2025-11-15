using System.ComponentModel.DataAnnotations;

namespace MVC.Models
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Ad zorunludur")]
        [MaxLength(50, ErrorMessage = "Ad en fazla 50 karakter olabilir")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Soyad zorunludur")]
        [MaxLength(50, ErrorMessage = "Soyad en fazla 50 karakter olabilir")]
        public required string Surname { get; set; }

        [Required(ErrorMessage = "Email zorunludur")]
        [EmailAddress(ErrorMessage = "Geçerli bir email giriniz")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Şifre zorunludur")]
        [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalı")]
        public required string Password { get; set; }
    }
}

