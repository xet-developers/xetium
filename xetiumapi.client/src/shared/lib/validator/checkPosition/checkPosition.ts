export class CheckPositionValidator {
    static validateInputValue(inputValue: string) {
        let value;
        if (inputValue.length === 0) value = 0
        else value = inputValue.split(', ').length
        return value >= 1 && value <= 15;
    }
}
