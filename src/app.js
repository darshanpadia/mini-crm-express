const express = require('express');
const app = express();
// const customerRoutes = require('./routes/customerRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

// Middlewares
app.use(express.json());
// app.use('/customers', customerRoutes)

app.get('/', (req, res) => {
    res.send('Customer API is running.');
});

app.use(notFoundHandler);

// central error handler
app.use(errorHandler);

module.exports = app;

