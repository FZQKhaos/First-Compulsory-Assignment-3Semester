using FluentValidation;
using Service.TransferModels.Requests.Property;

namespace Service.Validators;

public class UpdatePropertyValidator : AbstractValidator<UpdatePropertyDto>
{
    public UpdatePropertyValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThanOrEqualTo(2);
    }
}