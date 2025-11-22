using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MVC.Pages
{
    public class ErrorModel : PageModel
    {
        public bool ShowDetails {get; set;} = true;
        public string Message {get; set;} = "An error occurred.";
        public string StackTrace {get; set;} = string.Empty;
        public void OnGet()
        {
            var feature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            if (feature == null) return; // Hata yakalama özelliği yoksa buradan çıkar.
            
            // Gerçek bir exception yakalandığında:
            ShowDetails = true;
            Message = feature.Error.Message; // "An error occurred while saving the entity changes. See the inner exception for details." mesajı (veya inner exception) buraya gelir.
            StackTrace = feature.Error.StackTrace; // Tüm yığın izleme buraya gelir.
        }
    }
}
