using System.ComponentModel.DataAnnotations;

namespace Core.Attributes;

public class DateRangeAttribute : ValidationAttribute
{
    private readonly string _otherPropertyName;

    public DateRangeAttribute(string otherPropertyName)
    {
        _otherPropertyName = otherPropertyName;
    }

    protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
    {
        var firstDate = value as DateTime?;

        if (!firstDate.HasValue)
        {
            return new ValidationResult($"{validationContext.DisplayName} should be of type  DateTime.");
        }

        var lastDate = validationContext.ObjectType.GetProperty(_otherPropertyName)?.GetValue(validationContext.ObjectInstance) as DateTime?;

        if (!lastDate.HasValue)
        {
            return new ValidationResult($"{_otherPropertyName} should be of type  DateTime.");
        }

        var todayDate = DateTime.Today.AddDays(1);
        return firstDate > lastDate || lastDate > todayDate
            ? new ValidationResult(
                $"{validationContext.DisplayName} should be earlier than {_otherPropertyName} and not later than today at 23:59.")
            : ValidationResult.Success;
    }
}