using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class UpdateCustomerValidator : AbstractValidator<UpdateCustomerDto>
{
    public UpdateCustomerValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThanOrEqualTo(2);
        RuleFor(x => x.Address).NotEmpty();
        RuleFor(x => x.Phone).NotEmpty();
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
    }
}