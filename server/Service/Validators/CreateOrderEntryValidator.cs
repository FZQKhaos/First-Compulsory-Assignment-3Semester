using FluentValidation;
using Service.TransferModels.Requests.OrderEntries;

namespace Service.Validators;

public class CreateOrderEntryValidator : AbstractValidator<CreateOrderEntryDto>
{
    public CreateOrderEntryValidator()
    {
        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}