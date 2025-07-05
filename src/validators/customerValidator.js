const validator = require('validator')

// Create a standard error object for validation failures
function createError(field, message, statusCode=400) {
    return { field, message, statusCode }
}

/**
 * Validate customer input for creation
 * Returns error if id, name, or email are missing/invalid
 */
function validateCustomerInput(data) {
    const errors = [];

    if (!data.id || typeof data.id !== 'string') {
        errors.push(createError('id', 'ID is required and must be a string'));
    }

    if (!data.name || typeof data.name !== 'string') {
        errors.push(createError('name', 'Name is required and must be a string'));
    }

    if (!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
        errors.push(createError('email', 'A valid email is required', 422));
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Validate fields for customer update
 * At least one of name or email must be provided and valid
 */
function validateCustomerUpdate({ name, email }) {
    const errors = [];

    if (!name && !email) {
        errors.push(createError('body', 'At least one field (name or email) is required to update'));
    }

    if (name && typeof name!=='string') {
        errors.push(createError('name', 'Name must be a string', 422));
    }

    if (email && (typeof email !== 'string' || !validator.isEmail(email))) {
        errors.push(createError('email', 'A valid email is required', 422));
    }

    return {
        isValid : errors.length === 0,
        errors
    };
}

module.exports = {
    validateCustomerInput,
    validateCustomerUpdate
};