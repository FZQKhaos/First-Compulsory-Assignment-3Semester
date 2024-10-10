using FluentValidation;
using Service.TransferModels.Requests.OrderEntries;

namespace Service.Validators;

public class UpdateOrderEntryValidator : AbstractValidator<UpdateOrderEntryDto>
{
    public UpdateOrderEntryValidator()
    {
        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}