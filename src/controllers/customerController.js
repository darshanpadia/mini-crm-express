const customerService = require('../services/customerService');

// success response helper
function sendResponse(res, statusCode, message, data = null) {
    const response = { message };
    if (data) response.data = data;
    return res.status(statusCode).json(response);
}

// @desc    Create a new customer
// @route   POST /customers
function createCustomer(req, res, next) {
    try {
        const customer = customerService.createCustomer(req.body);
        return sendResponse(res, 201, "Customer created successfully", customer);
    } catch (err) {
        next(err); // send to errorHandler middleware
    }
}

// @desc    Get all customers
// @route   GET /customers
function getAllCustomers(req, res, next) {
    try{
        const customers = customerService.getAllCustomers();
        return sendResponse(res, 200, "Customer list fetched successfully", customers);
    } catch (err) {
        next(err);
    }
}

// @desc    Delete a customer by ID
// @route   DELETE /customers/:id
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

        return sendResponse(res, 200, `Customer with ID '${customerId}' deleted successfully`);
    } catch (err) {
        next(err);
    }
}

// @desc    Update a customer's name or email
// @route   PUT /customers/:id
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

        return sendResponse(res, 200, `Customer with ID '${customerId}' updated successfully`, updated);
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