using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PaperController (IDunderMifflinService service) : ControllerBase
{

    [HttpGet]
    [Route("")]
    public ActionResult<List<Paper>> GetPapers()
    {
        var papers = service.GetAllPapers();
        return Ok(papers);
    }

    [HttpPost]
    [Route("")]
    public ActionResult<Paper> CreatePaper(CreatePaperDto createPaperDto)
    {
        var paper = service.CreatePaper(createPaperDto);
        return Ok(paper);
    }
    
    [HttpPut]
    [Route("{id}")]
    public ActionResult<Paper> UpdatePaper(int id, UpdatePaperDto updatePaperDto)
    {
        
        if (id != updatePaperDto.Id )
        {
            return BadRequest("Wrong Paper Id");
        }
        
        var paper = service.UpdatePaper(updatePaperDto);
        return Ok(paper);
    }
}