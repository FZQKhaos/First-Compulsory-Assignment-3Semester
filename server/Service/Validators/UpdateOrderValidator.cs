using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class UpdateOrderValidator : AbstractValidator<UpdateOrderDto>
{
    public UpdateOrderValidator()
    {
        RuleFor(x => x.OrderDate).NotEmpty();
        RuleFor(x => x.Status).NotEmpty();
        RuleFor(x => x.TotalAmount).NotEmpty();
        RuleFor(x => x.CustomerId).NotEmpty();
    }
}