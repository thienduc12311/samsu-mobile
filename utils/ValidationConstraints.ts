import { validate } from 'validate.js'

export const validateString = (id: any, value: any) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        // @ts-expect-error TS(2339): Property 'format' does not exist on type '{ presen... Remove this comment to see the full error message
        constraints.format = {
            pattern: '.+',
            flags: 'i',
            message: "Value can't be blank.",
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateEmail = (id: any, value: any) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        // @ts-expect-error TS(2339): Property 'email' does not exist on type '{ presenc... Remove this comment to see the full error message
        constraints.email = true
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validatePassword = (id: any, value: any) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        // @ts-expect-error TS(2339): Property 'length' does not exist on type '{ presen... Remove this comment to see the full error message
        constraints.length = {
            minimum: 6,
            message: 'must be at least 6 characters',
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateCreditCardNumber = (id: any, value: any) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
        format: {
            pattern: /^(?:\d{4}-){3}\d{4}$|^\d{16}$/,
            message: 'Invalid credit card number.',
        },
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateCVV = (id: any, value: any) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
        format: {
            pattern: /^[0-9]{3,4}$/,
            message: 'Invalid CVV.',
        },
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateExpiryDate = (id: any, value: any) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
        format: {
            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
            message: 'Invalid expiry date. Please use MM/YY format.',
        },
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}
