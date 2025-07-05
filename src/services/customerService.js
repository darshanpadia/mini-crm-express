const customers = []
const Customer = require('../models/customerModel')

// Find a customer by ID (exact match)
function getCustomerById(id) {
    return customers.find(c => c.id === id);
}

// Find a customer by email (case-insensitive match)
function getCustomerByEmail(email) {
    if (email) {
        return customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    }
}

// Add new customer to in-memory store
function addCustomer(customer) {
    customers.push(customer);
}

// Create and return a conflict error (HTTP 409)
function createConflictError(message) {
    const error = new Error(message);
    error.status = 409;
    return error;
}

// Validate and create a new customer
function createCustomer({id, name, email}) {
    const existingById = getCustomerById(id);
    if (existingById) {
        throw createConflictError(`Customer with ID '${id}' already exists`);
    }
    const existingByEmail = getCustomerByEmail(email);
    if (existingByEmail) {
        throw createConflictError(`Customer with email '${email}' already exists`);
    }

    const newCustomer = new Customer(id, name, email);
    addCustomer(newCustomer);
    return newCustomer
}

// Return all customers from in-memory store
function getAllCustomers() {
    return customers;
}

// Remove customer by ID; return true if removed, false if not found
function deleteCustomerById(id) {
    const index = customers.findIndex(c => c.id === id);

    if (index === -1) {
        return false;
    }

    customers.splice(index,1);
    return true;
}

// Update customer by ID if found and email not duplicated
function updateCustomerById(id, updates) {
    const customer = getCustomerById(id);
    if (!customer) return null;

    if (updates.email) {
        const existingByEmail = getCustomerByEmail(updates.email);
        if (existingByEmail && existingByEmail.id !== id) {
            throw createConflictError(`Email '${updates.email}' is already used by other customer`);
        }
        customer.email = updates.email;
    }

    if (updates.name) {
        customer.name = updates.name;
    }

    return customer;
}

module.exports = {
    createCustomer,
    getAllCustomers,
    deleteCustomerById,
    updateCustomerById
};