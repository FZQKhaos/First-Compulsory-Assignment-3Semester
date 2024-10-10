using DataAccess.Models;

namespace Service.TransferModels.Requests.OrderEntries;

public class CreateOrderEntryDto
{
    public int OrderId { get; set; }
    
    public int ProductId { get; set; }
    
    public int Quantity { get; set; }

    public OrderEntry ToOrderEntry(int orderId)
    {
        return new OrderEntry
        {
            OrderId = orderId,
            ProductId = ProductId,
            Quantity = Quantity
        };
    }
}