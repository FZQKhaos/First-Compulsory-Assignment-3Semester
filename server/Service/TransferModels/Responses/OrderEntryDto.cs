using DataAccess.Models;

namespace Service.TransferModels.Responses;

public class OrderEntryDto
{
    public int Id { get; set; }
    
    public int? OrderId { get; set; }
    
    public int? ProductId { get; set; }
    
    public int Quantity { get; set; }

    public OrderEntryDto FromEntity(OrderEntry orderEntry)
    {
        return new OrderEntryDto
        {
            Id = orderEntry.Id,
            OrderId = orderEntry.OrderId,
            ProductId = orderEntry.ProductId,
            Quantity = orderEntry.Quantity
        };
    }
}