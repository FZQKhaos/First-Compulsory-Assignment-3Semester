namespace Service.TransferModels.Requests.Property;

public class CreatePropertyDto
{
    public string Name { get; set; }
    
    public DataAccess.Models.Property ToProperty()
    {
        return new DataAccess.Models.Property
        {
            PropertyName = Name
        };
    }
    
}