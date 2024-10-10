using DataAccess.Models;

namespace Service.TransferModels.Requests;

public class CreateOrderDto
{
    public Order ToOrder(int totalAmount, int customerId)
    {
        return new Order
        {
            OrderDate = DateTime.UtcNow,
            DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
            Status = "Processing",
            TotalAmount = totalAmount,
            CustomerId = customerId
        };
    }
}