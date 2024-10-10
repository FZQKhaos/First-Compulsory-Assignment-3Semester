using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class OrdersController(IDunderMifflinService service) : ControllerBase
{
    
    [HttpGet]
    [Route("")]
    public ActionResult<List<OrderDto>> GetOrders()
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

    [HttpPost]
    [Route("")]
    public ActionResult<Order> CreateOrder(CreateOrderDto orderDto)
    {
        var order = service.CreateOrder(orderDto);
        return Ok(order);
    }
    
    [HttpPatch]
    [Route("update/{id}")]
    public ActionResult<Order> UpdateOrder(int id, UpdateOrderDto updateOrderDto)
    {
        if (id != updateOrderDto.Id )
        {
            return BadRequest("Wrong Order Id");
        }
        
        var order = service.UpdateOrder(updateOrderDto);
        return Ok(order);
    }
}