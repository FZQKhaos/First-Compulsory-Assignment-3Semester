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
    
    [HttpGet]
    [Route("{id}")]
    public ActionResult<List<Order>> GetOrderByCustomerId(int id)
    {
        var order = service.GetOrdersByCustomerId(id);
        return Ok(order);
    }
}