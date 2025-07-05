const customers = []
const Customer = require('../models/customerModel')

function getCustomerById(id) {
    return customers.find(c => c.id === id);
}

function getCustomerByEmail(email) {
    if (email) {
        return customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    }
}

function addCustomer(customer) {
    customers.push(customer);
}

function createCustomer({id, name, email}) {
    const existingById = getCustomerById(id);
    if (existingById) {
        const error = new Error(`Customer with ID '${id}' already exists`);
        error.status = 409;
        throw error;
    }
    const existingByEmail = getCustomerByEmail(email);
    if (existingByEmail) {
        const error = new Error(`Customer with email '${email}' already exists`);
        error.status = 409;
        throw error;
    }

    const newCustomer = new Customer(id, name, email);
    addCustomer(newCustomer);
    return newCustomer
}

function getAllCustomers() {
    return customers;
}

function deleteCustomerById(id) {
    const index = customers.findIndex(c => c.id === id);

    if (index === -1) {
        return false;
    }

    customers.splice(index,1);
    return true;
}

module.exports = {
    createCustomer,
    getAllCustomers,
    deleteCustomerById
};