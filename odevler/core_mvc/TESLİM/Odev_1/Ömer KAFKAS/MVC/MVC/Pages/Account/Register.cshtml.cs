using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MVC.Data;
using MVC.Models;

namespace MVC.Pages.Account
{
    public class RegisterModel : PageModel
    {
        private readonly AppDbContext _context;

        public RegisterModel(AppDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public RegisterDto RegisterDto { get; set; } = null!;

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            // Email benzersizlik kontrolü
            var existingUser = _context.Users
                .FirstOrDefault(u => u.Email == RegisterDto.Email);
            
            if (existingUser != null)
            {
                ModelState.AddModelError("RegisterDto.Email", "Bu email zaten kayıtlı.");
                return Page();
            }

            var user = new User
            {
                Name = RegisterDto.Name,
                Surname = RegisterDto.Surname,
                Email = RegisterDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(RegisterDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return RedirectToPage("/Index");
        }
    }
}

