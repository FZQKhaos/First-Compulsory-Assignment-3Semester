using DataAccess.Models;

namespace Service.TransferModels.Responses;

public class CustomerDto
{
    public CustomerDto FromEntity(Customer customer)
    {
        return new CustomerDto
        {
            Id = customer.Id,
            
        }
    }
}