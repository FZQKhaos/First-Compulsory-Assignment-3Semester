using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;
using Service.TransferModels.Requests.Customers;
using Service.TransferModels.Requests.Property;
using Service.Validators;

namespace Service;

public interface IDunderMifflinService
{
    // Customers
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto);
    public List<Customer> GetAllCustomers();
    
    // Orders
    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto);
    public List<OrderDto> GetAllOrders();
    public List<OrderDto> GetOrdersByCustomerId(int id);
    
    // Papers
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    public List<Paper> GetAllPapers();
    
    // Properties
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto);
    public PropertyDto UpdateProperty(UpdatePropertyDto updatePropertyDto);
    public List<Property> GetAllProperties();
    public List<Property> GetPropertyById(int id);
    public void AddPropertyToPaper(int paperId, int propertyId);
}

// Validator lines are commented, uncomment when validators are done

public class DunderMifflinService(
    ILogger<DunderMifflinService> logger,
    IValidator<CreateCustomerDto> createCustomerValidator,
    IValidator<CreatePaperDto> createPaperValidator,
    IValidator<UpdatePaperDto> updatePaperValidator,
    IValidator<CreatePropertyDto> createPropertyValidator,
    IValidator<UpdatePropertyDto> updatePropertyValidator,
    IValidator<UpdateOrderDto> updateOrderValidator,
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
        updateOrderValidator.ValidateAndThrow(updateOrderDto);
        var order = context.Orders.Find(updateOrderDto.Id);
        if (order == null)
        {
            throw new Exception("Order not found");
        }
        
        order.OrderDate = updateOrderDto.OrderDate;
        order.DeliveryDate = updateOrderDto.DeliveryDate;
        order.Status = updateOrderDto.Status;
        order.TotalAmount = updateOrderDto.TotalAmount;
        order.CustomerId = updateOrderDto.CustomerId;
        
        context.Orders.Update(order);
        context.SaveChanges();
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
        createPaperValidator.ValidateAndThrow(createPaperDto);
        var paper = createPaperDto.ToPaper();
        context.Papers.Add(paper);
        context.SaveChanges();
        return new PaperDto().FromEntity(paper);
    }

    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto)
    {
        logger.LogInformation("Updating paper");
        updatePaperValidator.ValidateAndThrow(updatePaperDto);
        
        var paper = context.Papers.Find(updatePaperDto.Id);
        if (paper == null)
        {
            throw new Exception("Paper not found");
        }
        
        paper.Name = updatePaperDto.Name;
        paper.Discontinued = updatePaperDto.Discontinued;
        paper.Stock = updatePaperDto.Stock;
        paper.Price = updatePaperDto.Price;

        context.Papers.Update(paper);
        context.SaveChanges();
        
        return new PaperDto().FromEntity(paper);
    }

    public List<Paper> GetAllPapers()
    {
        return context.Papers.ToList();
    }

    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto)
    {
        logger.LogInformation("Creating new property");
        createPropertyValidator.ValidateAndThrow(createPropertyDto);
        var property = createPropertyDto.ToProperty();
        context.Properties.Add(property);
        context.SaveChanges();
        return new PropertyDto().FromEntity(property);
    }

    public PropertyDto UpdateProperty(UpdatePropertyDto updatePropertyDto)
    {
        logger.LogInformation("Updating property");
        updatePropertyValidator.ValidateAndThrow(updatePropertyDto);
        
        var property = context.Properties.Find(updatePropertyDto.Id);
        if (property == null)
        {
            throw new Exception("Property not found");
        }
        
        property.PropertyName = updatePropertyDto.Name;
        
        context.Properties.Update(property);
        context.SaveChanges();
        
        return new PropertyDto().FromEntity(property);
    }

    public List<Property> GetAllProperties()
    {
        return context.Properties.ToList();
    }

    public List<Property> GetPropertyById(int id)
    {
        return context.Properties.Where(x => x.Id == id).ToList();
    }
    
    public void AddPropertyToPaper(int paperId, int propertyId)
    {
        var paper = context.Papers.Find(paperId);
        var property = context.Properties.Find(propertyId);
        
        paper.Properties.Add(property);
        context.SaveChanges();
    }
}