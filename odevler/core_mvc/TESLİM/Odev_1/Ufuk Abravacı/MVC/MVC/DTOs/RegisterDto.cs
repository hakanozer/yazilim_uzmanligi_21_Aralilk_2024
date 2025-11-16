using System.ComponentModel.DataAnnotations;

namespace MVC.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MaxLength(100)]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Surname is required.")]
    [MaxLength(100)]
    public string? Surname { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
    public string? Password { get; set; }
}