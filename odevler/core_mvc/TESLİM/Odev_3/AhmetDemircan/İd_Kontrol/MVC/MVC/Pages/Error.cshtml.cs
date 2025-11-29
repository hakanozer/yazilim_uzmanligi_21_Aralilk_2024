using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text;

namespace MVC.Pages
{
    public class ErrorModel : PageModel
    {
        public bool ShowDetails { get; set; }
        public string Message { get; set; } = "";
        public string StackTrace { get; set; } = "";
        public new int? StatusCode { get; set; }

        public IActionResult OnGet(int? code = null)
        {
            if (code == 404)
            {
                return RedirectToPage("/404");
            }
            if (code == 403)
            {
                return RedirectToPage("/403");
            }

            HandleError(code);
            return Page();
        }

        public void OnPost(int? code = null)
        {
            HandleError(code);
        }

        private void HandleError(int? code)
        {
            StatusCode = code;

            var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            if (exceptionFeature != null)
            {
                // Full inner exception yapısını çıkar
                Message = BuildFullExceptionMessage(exceptionFeature.Error);
                StackTrace = exceptionFeature.Error.ToString(); // Tüm iç stack trace zinciri
                ShowDetails = true;
                return;
            }

            if (code != null)
            {
                ShowDetails = true;
                if (code == 404)
                {
                    Message = "Sayfa bulunamadı";
                    StackTrace = "Aradığınız sayfa mevcut değil veya taşınmış olabilir.";
                }
                else if (code == 403)
                {
                    Message = "Erişim reddedildi";
                    StackTrace = "Bu sayfaya erişim yetkiniz bulunmamaktadır.";
                }
                else
                {
                    Message = $"HTTP Error: {code}";
                    StackTrace = "No exception was thrown. This is a status code error.";
                }
            }
        }

        private string BuildFullExceptionMessage(Exception ex)
        {
            StringBuilder sb = new();

            sb.AppendLine($"[Exception] {ex.GetType().Name}: {ex.Message}");

            var inner = ex.InnerException;
            while (inner != null)
            {
                sb.AppendLine();
                sb.AppendLine($"[Inner Exception] {inner.GetType().Name}: {inner.Message}");
                inner = inner.InnerException;
            }

            return sb.ToString();
        }
    }
}
