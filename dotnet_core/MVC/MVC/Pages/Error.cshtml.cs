using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MVC.Pages
{
    public class ErrorModel : PageModel
    {
        public bool ShowDetails { get; set; }
        public string Message { get; set; } = "";
        public string StackTrace { get; set; } = "";
        public int? StatusCode { get; set; }

        public void OnGet(int? code = null)
        {
            StatusCode = code;

            // Exception yakala
            var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            if (exceptionFeature != null)
            {
                ShowDetails = true;
                Message = exceptionFeature.Error.Message;
                StackTrace = exceptionFeature.Error.StackTrace;
                return;
            }

            // Exception yok = Status Code hatası
            if (code != null)
            {
                ShowDetails = true;
                Message = $"HTTP Hatası: {code}";
                StackTrace = "Bu bir exception değil, HTTP status hatasıdır.";
            }
        }

        public void OnPost(int? code = null)
        {
            OnGet(code);
        }
    }
}
