using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyApp.Namespace
{
    public class ErrorModel : PageModel
    {
        public bool ShowDetails {get; set;} = false;
        public string Message {get; set;} = "An error occurred.";
        public string StackTrace {get; set;} = string.Empty;
        public void OnGet()
        {
            var feature = HttpContext.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();

            if (feature != null && Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                ShowDetails = true;
                Message = feature.Error.Message;
                StackTrace = feature.Error.StackTrace;
            }
        }
    }
}
