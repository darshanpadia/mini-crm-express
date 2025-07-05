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

function deleteCustomer(req, res, next) {
    try {
        const customerId = req.params.id;
        
        const deleted = customerService.deleteCustomerById(customerId);

        if (!deleted) {
            return res.status(404).json({
                error: true,
                message: `Customer with ID '${customerId}' not found.`
            });
        }

        return res.status(200).json({
            message: `Customer with ID '${customerId}' deleted successfully`
        });
    } catch (err) {
        next(err);
    }
}

function updateCustomer(req, res, next) {
    try {
        const customerId = req.params.id;
        const { email, name } = req.body;

        const updated = customerService.updateCustomerById(customerId, { name, email });

        if (!updated) {
            return res.status(404).json({
                error: true,
                message: `Customer with ID '${customerId}' not found`
            });
        }

        return res.status(200).json({
            message: `Customer with ID '${customerId}' updated successfully`,
            data: updated
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    deleteCustomer,
    updateCustomer
}