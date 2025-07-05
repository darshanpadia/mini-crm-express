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

function getAllCustomers(req, res, next) {
    try{
        const customers = customerService.getAllCustomers();

        return res.status(200).json({
            message: "Customer list fetched successfully",
            data: customers
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createCustomer,
    getAllCustomers
}