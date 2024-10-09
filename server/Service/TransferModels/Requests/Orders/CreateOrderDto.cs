using DataAccess.Models;

namespace Service.TransferModels.Requests;

public class CreateOrderDto
{
    public DateTime? OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string Status { get; set; }
    public int TotalAmount { get; set; }
    public int CustomerId { get; set; }

    public Order ToOrder(int totalAmount)
    {
        return new Order
        {
            OrderDate = DateTime.Today,
            DeliveryDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3)),
            Status = Status,
            TotalAmount = TotalAmount,
            CustomerId = CustomerId
        };
    }
}