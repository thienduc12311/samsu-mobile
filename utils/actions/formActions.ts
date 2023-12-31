import {
    validateCVV,
    validateCreditCardNumber,
    validateEmail,
    validateExpiryDate,
    validatePassword,
    validateString,
} from '../ValidationConstraints'

export const validateInput = (inputId: any, inputValue: any, refInputValue?: any) => {
    if (
        inputId === 'fullName' ||
        inputId === 'shortName' ||
        inputId === 'location' ||
        inputId === 'phoneNumber' ||
        inputId === 'creditCardHolderName' ||
        inputId === 'bio' ||
        inputId === 'address' ||
        inputId === 'university' ||
        inputId === 'postalCode' ||
        inputId === 'appartment'
    ) {
        return validateString(inputId, inputValue)
    } else if (inputId === 'email') {
        return validateEmail(inputId, inputValue)
    } else if (inputId === 'password' || inputId === 'confirmPassword') {
        return validatePassword(inputId, inputValue, refInputValue)
    } else if (inputId === 'resetToken') {
        return validateString(inputId, inputValue)
    } else if (inputId === 'creditCardNumber') {
        return validateCreditCardNumber(inputId, inputValue)
    } else if (inputId === 'creditCardExpiryDate') {
        return validateExpiryDate(inputId, inputValue)
    } else if (inputId === 'cvv') {
        return validateCVV(inputId, inputValue)
    }
}
