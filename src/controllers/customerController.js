const customerService = require('../services/customerService');
const Customer = require('../models/customerModel');

function createCustomer(req, res, next) {
    try {
        const { id, name, email } = req.body;

        // check if customer already exists
        const existing = customerService.getCustomerById(id);
        if (existing) {
            return res.status(409).json({
                error: true,
                message: `Customer with ID '${id}' already exists`
            });
        }

        // Check if customer email already exists
        const existingByEmail = customerService.getCustomerByEmail(email);
        if (existingByEmail) {
            return res.status(409).json({
                error: true,
                message: `Customer with email '${email}' already exists.`
            });
        }

        const newCustomer = new Customer(id, name, email);
        customerService.addCustomer(newCustomer);

        return res.status(201).json({
            message: "Customer created successfully",
            data: newCustomer
        });
    } catch (err) {
        next(err); // send to errorHandler middleware
    }
}

module.exports = {
    createCustomer
}