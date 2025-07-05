const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const {validateCustomerInput, validateCustomerUpdate} = require('../validators/customerValidator');

// POST /customers
router.post('/', (req, res, next) => {
    const { isValid, errors } = validateCustomerInput(req.body);

    if (!isValid) {
        return res.status(errors[0].statusCode || 400).json({
            error: true,
            message: 'Validation failed',
            details: errors
        })
    }

    customerController.createCustomer(req, res, next);
});

router.get('/', customerController.getAllCustomers);

router.delete('/:id', customerController.deleteCustomer);

router.put('/:id', (req, res, next) => {
    const { isValid, errors } = validateCustomerUpdate(req.body);
    
    if (!isValid) {
        return res.status(errors[0].statusCode || 400).json({
            error: true,
            message: 'Validation failed',
            details: errors
        });
    }

    customerController.updateCustomer(req, res, next);
});


module.exports = router;