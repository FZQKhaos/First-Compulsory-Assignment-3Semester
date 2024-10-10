using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class UpdatePaperValidator : AbstractValidator<UpdatePaperDto>
{
    public UpdatePaperValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThanOrEqualTo(2);
        RuleFor(x => x.Price).GreaterThan(0);
        RuleFor(x => x.Stock).GreaterThanOrEqualTo(0);
    }
}