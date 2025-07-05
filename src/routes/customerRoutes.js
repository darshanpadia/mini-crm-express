const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const {validateCustomerInput, validateCustomerUpdate} = require('../validators/customerValidator');

// Local helper to send validation errors consistently
function sendValidationError(res, errors) {
    return res.status(errors[0].statusCode || 400).json({
        error: true,
        message: 'Validation failed',
        details: errors
    });
}

/**
 * @route   POST /customers
 * @desc    Create a new customer
 */
router.post('/', (req, res, next) => {
    const { isValid, errors } = validateCustomerInput(req.body);
    if (!isValid) return sendValidationError(res, errors);

    customerController.createCustomer(req, res, next);
});

/**
 * @route   GET /customers
 * @desc    Retrieve all customers
 */
router.get('/', customerController.getAllCustomers);

/**
 * @route   DELETE /customers/:id
 * @desc    Delete a customer by ID
 */
router.delete('/:id', customerController.deleteCustomer);

/**
 * @route   PUT /customers/:id
 * @desc    Update a customer's name or email
 */
router.put('/:id', (req, res, next) => {
    const { isValid, errors } = validateCustomerUpdate(req.body);
    
    if (!isValid) return sendValidationError(res, errors);

    customerController.updateCustomer(req, res, next);
});


module.exports = router;