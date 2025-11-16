using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Dto;
using MVC.Services;

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
        public RegisterDto RegisterDto { get; set; } = new();

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPost()
        {
            if (!ModelState.IsValid)
                return Page();

            var result = await _registerService.RegisterAsync(RegisterDto);

            if (!result.Success)
            {
                // E-posta zaten kayıtlı gibi hata durumunu gösterir
                ModelState.AddModelError(string.Empty, result.Message);
                return Page();
            }

            return RedirectToPage("/Index");
        }
    }
}