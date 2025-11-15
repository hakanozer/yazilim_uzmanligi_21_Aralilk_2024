using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Dto.UserDto;
using MVC.Services;
using MVC.Utils;

namespace MVC.Pages.Account
{
    public class RegisterModel : PageModel
    {
        private readonly RegisterService _registerService;

        public RegisterModel(RegisterService registerService)
        {
            _registerService = registerService;
        }

        [BindProperty]
        public UserRegisterDto Register { get; set; } = new();

    

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            // 1) Model doğrulanmamışsa sayfa tekrar göster
            if (!ModelState.IsValid)
                return Page();
            // 2) Şifreler uyuşmuyor mu kontrol et
            if (Register.Password != Register.PasswordAgain)
            {
                ModelState.AddModelError(string.Empty, "Şifreler uyuşmuyor!");
                return Page();
            }
            
            

            // 3) Servisi çağır
            _registerService.UserRegister(Register.Name, Register.Surname, Register.Email, Register.Password, Register.PasswordAgain);

            // 4) Başarılı -> Login sayfasına yönlendir
            return RedirectToPage("/Index");
        }
    }
}
