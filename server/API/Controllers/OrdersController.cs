using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class OrdersController(IDunderMifflinService service) : ControllerBase
{
    
    [HttpGet]
    [Route("")]
    public ActionResult<List<Order>> GetOrders()
    {
        var orders = service.GetAllOrders();
        return Ok(orders);
    }
}