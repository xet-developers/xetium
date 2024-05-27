using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes;

public class ValidEnumValueAttribute : ValidationAttribute
{
    private readonly Type _enumType;

    public ValidEnumValueAttribute(Type enumType)
    {
        _enumType = enumType;
    }
    
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (_enumType is null || !_enumType.IsEnum)
        {
            return new ValidationResult($"The type {_enumType} is not an enum.");
        }

        if (value is not null  && Enum.IsDefined(_enumType, value))
        {
            return ValidationResult.Success;
        }

        return new ValidationResult($"The value {value} is not defined in the enum {_enumType}.");
    
    }
}