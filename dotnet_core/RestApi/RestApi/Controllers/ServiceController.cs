using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestApi.Dto.ServiceDto;
using RestApi.Models;
using RestApi.Services;
using System.Collections.Generic;
using System.Linq;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {

        private readonly CategoryService _categoryService;
        public ServiceController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public IActionResult Add(ServiceAddDto serviceAddDto)
        {
            var addService = _categoryService.ServiceAdd(serviceAddDto);
            if (addService != null)
            {
                return Ok(addService);
            }
            return BadRequest(serviceAddDto.Name + " All Ready Use");
        }

        [HttpGet("all")]
        public List<Service> GetAllService()
        {
            return _categoryService.GetAllService();
        }

    }

}