using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.Services;
using MVC.Dto;

namespace MVC.Pages.Account
{
    public class RegisterModel : PageModel
    {
        [BindProperty]
        public RegisterDto Input { get; set; } = new RegisterDto();

        private readonly RegisterService _registerService;

        public RegisterModel(RegisterService registerService)
        {
            _registerService = registerService;
        }

        public void OnGet() { }

        public async Task<IActionResult> OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var result = await _registerService.UserRegister(Input.Name, Input.Surname, Input.Email, Input.Password);
            if (!result.ok)
            {
                ModelState.AddModelError("Input.Email", result.error!);
                return Page();
            }
            return RedirectToPage("/Index");
        }
    }
}