using DataAccess.Models;

namespace Service.TransferModels.Requests;

public class CreatePaperDto
{
    public string Name { get; set; }
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public string? Picture { get; set; }

    public Paper ToPaper()
    {
        return new Paper
        {
            Name = Name,
            Discontinued = false,
            Stock = Stock,
            Price = Price,
            Picture = Picture
        };
    }
}