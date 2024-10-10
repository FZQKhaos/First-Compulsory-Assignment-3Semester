using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Property;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class PropertyController(IDunderMifflinService service) : ControllerBase
{
    
    [HttpGet]
    [Route("")]
    public ActionResult<List<Property>> GetProperties()
    {
        var properties = service.GetAllProperties();
        return Ok(properties);
    }
    
    [HttpGet]
    [Route("get/{id}")]
    public ActionResult<List<Property>> GetPropertyById(int id)
    {
        var property = service.GetPropertyById(id);
        return Ok(property);
    }

    [HttpPost]
    [Route("create")]
    public ActionResult<Property> CreateProperty(CreatePropertyDto createPropertyDto)
    {
        var property = service.CreateProperty(createPropertyDto);
        return Ok(property);
    }
    
    [HttpPut]
    [Route("update/{id}")]
    public ActionResult<Property> UpdateProperty(int id, UpdatePropertyDto updatePropertyDto)
    {
        
        if (id != updatePropertyDto.Id )
        {
            return BadRequest("Wrong Property Id");
        }
        
        var property = service.UpdateProperty(updatePropertyDto);
        return Ok(property);
    }
}