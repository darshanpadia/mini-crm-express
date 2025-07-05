const express = require('express');
const app = express();

// Routes import
const customerRoutes = require('./routes/customerRoutes');

// Middleware imports
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

// Parsing incoming JSON request bodies
app.use(express.json());

app.use('/customers', customerRoutes)

// Handle 404 - not found
app.use(notFoundHandler);

// central error handler
app.use(errorHandler);

module.exports = app;

