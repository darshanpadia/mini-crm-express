const customerService = require('../services/customerService');

function createCustomer(req, res, next) {
    try {
        const customer = customerService.createCustomer(req.body);
        
        return res.status(201).json({
            message: "Customer created successfully",
            data: customer
        });
    } catch (err) {
        next(err); // send to errorHandler middleware
    }
}

module.exports = {
    createCustomer
}