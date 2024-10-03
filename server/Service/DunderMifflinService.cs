using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;
using Service.TransferModels.Requests.Customers;

namespace Service;

public interface IDunderMifflinService
{
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto);
    public List<Customer> GetAllCustomers();
    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto);
    public List<OrderDto> GetAllOrders();
    public List<OrderDto> GetOrdersByCustomerId(int id);
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    
    public List<Paper> GetAllPapers();
}

// Validator lines are commented, uncomment when validators are done

public class DunderMifflinService(
    ILogger<DunderMifflinService> logger,
    IValidator<CreateCustomerDto> createCustomerValidator,
    DunderMifflinContext context
    ) : IDunderMifflinService
{
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        logger.LogInformation("Creating new customer");
        createCustomerValidator.ValidateAndThrow(createCustomerDto);
        var customer = createCustomerDto.ToCustomer();
        context.Customers.Add(customer);
        context.SaveChanges();
        return new CustomerDto().FromEntity(customer);
    }

    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto)
    {
        logger.LogInformation("Updating customer");
        // updateCustomerValidator.ValidateAndThrow(updateCustomerDto);
        var customer = updateCustomerDto.ToCustomer();
        context.Customers.Update(customer);
        return new CustomerDto().FromEntity(customer);
    }

    public List<Customer> GetAllCustomers()
    {
        return context.Customers.ToList();
    }

    public OrderDto CreateOrder(CreateOrderDto createOrderDto)
    {
        logger.LogInformation("Creating new order");
        // createOrderValidator.ValidateAndThrow(createOrderDto);
        var order = createOrderDto.ToOrder();
        context.Orders.Add(order);
        context.SaveChanges();
        return new OrderDto().FromEntity(order);
    }

    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto)
    {
        logger.LogInformation("Updating order");
        // updateOrderValidator.ValidateAndThrow(updateOrderDto);
        var order = updateOrderDto.ToOrder();
        context.Orders.Update(order);
        return new OrderDto().FromEntity(order);
    }

    public List<OrderDto> GetAllOrders()
    {
        return context.Orders
            .Include(o => o.Customer)
            .Select(o => new OrderDto().FromEntity(o)).ToList();
    }
    
    public List<OrderDto> GetOrdersByCustomerId(int id)
    {
        return context.Orders.Where(x => x.CustomerId == id)
            .Include(o => o.Customer)
            .Select(o => new OrderDto().FromEntity(o)).ToList();
    }

    public PaperDto CreatePaper(CreatePaperDto createPaperDto)
    {
        logger.LogInformation("Creating new paper");
        // createPaperValidator.ValidateAndThrow(createPaperDto);
        var paper = createPaperDto.ToPaper();
        context.Papers.Add(paper);
        context.SaveChanges();
        return new PaperDto().FromEntity(paper);
    }

    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto)
    {
        logger.LogInformation("Updating paper");
        // updatePaperValidator.ValidateAndThrow(updatePaperDto);
        var paper = updatePaperDto.ToPaper();
        context.Papers.Update(paper);
        return new PaperDto().FromEntity(paper);
    }

    public List<Paper> GetAllPapers()
    {
        return context.Papers.ToList();
    }
}