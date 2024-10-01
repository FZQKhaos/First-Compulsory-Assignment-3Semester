using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Microsoft.Extensions.Logging;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;

namespace Service;

public interface IDunderMifflinService
{
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto);
    public List<Customer> GetAllCustomers(int limit, int startAt);
    public OrderDto CreateOrder(CreateOrderDto createOrderDto);
    public OrderDto UpdateOrder(UpdateOrderDto updateOrderDto);
    public List<Order> GetAllOrders(int limit, int startAt);
    public PaperDto CreatePaper(CreatePaperDto createPaperDto);
    public PaperDto UpdatePaper(UpdatePaperDto updatePaperDto);
    public List<Paper> GetAllPapers(int limit, int startAt);
}

public class DunderMifflinService(
    ILogger<DunderMifflinService> logger,
    IDunderMifflinRepository dunderMifflinRepository,
    IValidator<CreateCustomerDto> createCustomerValidator,
    DunderMifflinContext context
    ) : IDunderMifflinService
{
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        logger.LogInformation("Creating new customer");
        createCustomerValidator.ValidateAndThrow(createCustomerDto);
        var customer = createCustomerDto.ToCustomer();
        Customer newCustomer = dunderMifflinRepository.InsertCustomer(customer);
        return new CustomerDto().FromEntity(newCustomer);
    }

    public CustomerDto UpdateCustomer(UpdateCustomerDto updateCustomerDto)
    {
        logger.LogInformation("Updating customer");
        // Validator needed to be written for this line
        var customer = updateCustomerDto.ToCustomer();
        context.Customers.Update(customer);
        return new CustomerDto().FromEntity(customer);
    }

    public List<Customer> GetAllCustomers(int limit, int startAt)
    {
        return context.Customers.OrderBy(c => c.Id).Skip(startAt).Take(limit).ToList();
    }
}