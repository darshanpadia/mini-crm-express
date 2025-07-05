const express = require('express');
const app = express();

const customerRoutes = require('./routes/customerRoutes');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

// Middlewares
app.use(express.json());

app.use('/customers', customerRoutes)


app.use(notFoundHandler);

// central error handler
app.use(errorHandler);

module.exports = app;

