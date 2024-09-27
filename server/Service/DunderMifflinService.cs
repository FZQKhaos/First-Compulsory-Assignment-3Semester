using DataAccess;
using DataAccess.Models;
using FluentValidation;
using Service.TransferModels.Requests.Customers;
using Service.TransferModels.Responses;
using Service.Validators;

namespace Service;

public interface IDunderMifflinService
{
     //Customer
     public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
     public List<Customer> GetAllCustomers();

}

public class DunderMifflinService(
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
}