using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MVC.DTOs;
using MVC.Services;

namespace MVC.Pages.Account;

public class RegisterModel : PageModel
{
    private readonly UserService _userService;

    [BindProperty]
    public RegisterDto RegisterDto { get; set; } = new();

    public RegisterModel(UserService userService)
    {
        _userService = userService;
    }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
            return Page();

        var success = await _userService.RegisterUserAsync(RegisterDto);

        if (!success)
        {
            ModelState.AddModelError(string.Empty, "A user with this email already exists.");
            return Page();
        }

        TempData["Message"] = "Registration successful!";
        return RedirectToPage("/Index");
    }
}