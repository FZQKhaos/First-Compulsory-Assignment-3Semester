using FluentValidation;
using Service.TransferModels.Requests;

namespace Service.Validators;

public class CreatePaperValidator : AbstractValidator<CreatePaperDto>
{
    public CreatePaperValidator()
    {
        RuleFor(x => x.Name.Length).GreaterThanOrEqualTo(2);
        RuleFor(x => x.Price).GreaterThan(0);
        RuleFor(x => x.Stock).GreaterThan(0);
    }
}