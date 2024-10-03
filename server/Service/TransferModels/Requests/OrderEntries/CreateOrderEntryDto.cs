using DataAccess.Models;

namespace Service.TransferModels.Requests.OrderEntries;

public class CreateOrderEntryDto
{
    public int OrderId { get; set; }
    
    public int ProductId { get; set; }
    
    public int Quantity { get; set; }

    public OrderEntry ToOrderEntry()
    {
        return new OrderEntry
        {
            OrderId = OrderId,
            ProductId = ProductId,
            Quantity = Quantity
        };
    }
}