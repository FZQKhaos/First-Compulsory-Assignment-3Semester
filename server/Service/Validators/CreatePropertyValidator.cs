using FluentValidation;
using Service.TransferModels.Requests.Property;

namespace Service.Validators;

public class CreatePropertyValidator : AbstractValidator<CreatePropertyDto>
{
    public CreatePropertyValidator()
    {
        RuleFor(x => x.PropertyName.Length).GreaterThanOrEqualTo(2);
    }
}