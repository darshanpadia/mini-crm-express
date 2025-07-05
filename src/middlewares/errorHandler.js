function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    const isDev = process.env.NODE_ENV === 'development';

    console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);

    const errorResponse = {
        error: true,
        message: err.message || "Internal server error",
        statusCode,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    };

    if (isDev && err.stack) {
        errorResponse.stack = err.stack; // show stack only in development server
    }

    res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;