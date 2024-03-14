using System.ComponentModel.DataAnnotations;

namespace xetiumAPI.ServerApp.Attributes;

public class CommaSeparatedAttribute: ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is not string strValue)
        {
            return new ValidationResult("Value is not string");
        }
        
        var values = strValue.Split(',');

        return values.Length is < 4 or > 15 ? new ValidationResult("The number of elements must be greater than 3 and less than 16.") 
            : ValidationResult.Success;
    }
}


