using System.ComponentModel.DataAnnotations;

namespace MVC.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public required string Name { get; set; }

        [Required, MaxLength(50)]
        public required string Surname { get; set; }

        [Required, EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string PasswordHash { get; set; }
    }
}

