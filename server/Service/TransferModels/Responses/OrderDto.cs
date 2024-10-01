using DataAccess.Models;

namespace Service.TransferModels.Responses;

public class OrderDto
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; }
    public int TotalAmount { get; set; }
    public int? CustomerId { get; set; }

    public OrderDto FromEntity(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            CustomerId = order.CustomerId
        };
    }
}