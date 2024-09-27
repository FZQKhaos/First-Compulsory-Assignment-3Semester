using FluentValidation;
using Service.TransferModels.Requests.Customers;

namespace Service.Validators;

public class CreateCustomerValidator : AbstractValidator<CreateCustomerDto>
{
    public CreateCustomerValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThanOrEqualTo(2);
        RuleFor(x => x.Address).NotEmpty();
        RuleFor(x => x.Phone).NotEmpty();
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
    }
}