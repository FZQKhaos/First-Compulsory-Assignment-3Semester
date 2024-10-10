using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests;
using Service.TransferModels.Requests.OrderEntries;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class OrdersController(IDunderMifflinService service) : ControllerBase
{
    
    [HttpPut]
    [Route("update/{id}")]
    public ActionResult<Order> UpdateOrder(int id, UpdateOrderDto orderDto)
    {
        if (id != orderDto.Id )
        {
            return BadRequest("Wrong Order Id");
        }
        
        var order = service.UpdateOrder(orderDto);
        return Ok(order);
    }
}