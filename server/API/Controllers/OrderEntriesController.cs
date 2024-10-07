using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.OrderEntries;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderEntriesController(IDunderMifflinService service) : ControllerBase
{
    
    [HttpPost]
    [Route("")]
    public ActionResult<OrderEntry> CreateOrderEntry(CreateOrderEntryDto createOrderEntryDto)
    {
        var orderEntry = service.CreateOrderEntry(createOrderEntryDto);
        return Ok(orderEntry);
    }
}