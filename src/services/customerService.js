const customers = []
const Customer = require('../models/customerModel')

function getCustomerById(id) {
    return customers.find(c => c.id === id);
}

function getCustomerByEmail(email) {
    console.log(email)
    if (email) {
        return customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    }
}

function addCustomer(customer) {
    customers.push(customer);
}

function createCustomer({id, name, email}) {
    console.log(id, name, email)
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

module.exports = {
    getCustomerById,
    getCustomerByEmail,
    addCustomer,
    createCustomer
}