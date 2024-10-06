using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Customers;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PapersController(IDunderMifflinService service) : ControllerBase
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
    public ActionResult<Customer> CreatePaper(CreateCustomerDto createPaperDto)
    {
        var paper = service.CreateCustomer(createPaperDto);
        return Ok(paper);
    }
}