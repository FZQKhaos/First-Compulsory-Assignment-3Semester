using DataAccess.Models;

namespace Service.TransferModels.Requests.OrderEntries;

public class UpdateOrderEntryDto
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }

    public OrderEntry ToOrderEntry()
    {
        return new OrderEntry
        {
            Id = Id,
            OrderId = OrderId,
            ProductId = ProductId,
            Quantity = Quantity,
        };
    }
}