function notFoundHandler(req, res, next) {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.status = 404;
    next(error);
}

module.exports = notFoundHandler;