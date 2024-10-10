using DataAccess.Models;

namespace Service.TransferModels.Responses;

public class PropertyDto
{
    
    public int Id { get; set; }
    public string Name { get; set; }
    
    
    public PropertyDto FromEntity(Property property)
    {
        return new PropertyDto
        {
            Id = property.Id,
            Name = property.PropertyName
        };
    }
}