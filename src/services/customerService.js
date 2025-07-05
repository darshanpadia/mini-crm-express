const customers = []

function getCustomerById(id) {
    return customers.find(c => c.id === id);
}

function getCustomerByEmail(email) {
    return customers.find(c => c.email.toLowerCase() === email.toLowerCase());
}

function addCustomer(customer) {
    customers.push(customer);
}

module.exports = {
    getCustomerById,
    getCustomerByEmail,
    addCustomer
}