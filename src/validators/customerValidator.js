const validator = require('validator')

/**
 * Validate customer input for creation
 * @param {Object} data - The customer object
 * @returns {Object} result - { isValid, errors: [{ field, message, statusCode }] }
 */
function validateCustomerInput(data) {
    const errors = [];

    if (!data.id || typeof data.id !== 'string') {
        errors.push({
            field : "id",
            message: "ID is required and must be a string",
            statusCode: 400
        });
    }

    if (!data.name || typeof data.name !== 'string') {
        errors.push({
            field: "name",
            message: "Name is required and must be a string"
        });
    }

    if (!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
        errors.push({
            field: "email",
            message: "A valid email is required",
            statusCode: 422
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = {
    validateCustomerInput
};