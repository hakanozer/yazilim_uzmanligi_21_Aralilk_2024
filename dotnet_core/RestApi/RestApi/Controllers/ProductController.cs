using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "User, Admin")]
    public class ProductController : ControllerBase
    {

        [HttpGet("get")]
        public IActionResult getOne()
        {
            return Ok("Product Controller Call");
        }

    }

}