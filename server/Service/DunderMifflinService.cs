using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Service.TransferModels.Requests.Customers;
using Service.TransferModels.Responses;
using Service.Validators;

namespace Service;

public interface IDunderMifflinService
{
     //Customer
     public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
     public List<Customer> GetAllCustomers();
     
     //Order
     public List<OrderDto> GetAllOrders();
     public List<OrderDto> GetOrdersByCustomerId(int id);

}

public class DunderMifflinService (
     MyDbContext context,
     IValidator<CreateCustomerDto> createCustomerValidator
     ) : IDunderMifflinService
{
     public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto)
     {
          createCustomerValidator.ValidateAndThrow(createCustomerDto);
          var customer = createCustomerDto.ToCustomer();
          context.Customers.Add(customer);
          context.SaveChanges();
          return new CustomerDto().FromEntity(customer);
     }

     public List<Customer> GetAllCustomers()
     {
          return context.Customers.ToList();
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
}