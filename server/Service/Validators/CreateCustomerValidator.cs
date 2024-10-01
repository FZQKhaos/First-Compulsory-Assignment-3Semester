using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class CreateCustomerValidator : AbstractValidator<CreateCustomerDto>
{
    public CreateCustomerValidator()
    {
        RuleFor(p => p.Name.Length).GreaterThan(3);
    }
}