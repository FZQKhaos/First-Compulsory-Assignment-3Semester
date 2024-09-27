using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.TransferModels.Requests.Customers;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CustomersController(IDunderMifflinService service) : ControllerBase
{
    [HttpGet]
    [Route("")]
    public ActionResult<List<Customer>> GetCustomers()
    {
        var customers = service.GetAllCustomers();
        return Ok(customers);
    }
    
    [HttpPost]
    [Route("")]
    public ActionResult<Customer> CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        var customer = service.CreateCustomer(createCustomerDto);
        return Ok(customer);
    }
}