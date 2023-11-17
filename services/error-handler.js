const createError = require('http-errors');

module.exports = (err, req, res, next) => {
    console.log("to handle this error go to services/error-handler.js");
    console.error(err.message); // Log error message
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
};




















function validationErrorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: 'Validation failed.', details: err.details });
    } else {
        next(err);
    }
}

function authenticationErrorHandler(err, req, res, next) {
    if (err.name === 'AuthenticationError') {
        res.status(401).json({ error: 'Authentication failed.' });
    } else {
        next(err);
    }
}

function authorizationErrorHandler(err, req, res, next) {
    if (err.name === 'AuthorizationError') {
        res.status(403).json({ error: 'You do not have the necessary permissions.' });
    } else {
        next(err);
    }
}

function notFoundErrorHandler(req, res, next) {
    next(createError(404, 'Resource not found.'));
}

function databaseErrorHandler(err, req, res, next) {
    if (err.name === 'MongoError') {
        res.status(500).json({ error: 'Database error.' });
    } else {
        next(err);
    }
}

function genericServerErrorHandler(err, req, res, next) {
    if (!err.status) {
        res.status(500).json({ error: 'Internal server error.', details: err.message });
    } else {
        res.status(err.status).json({ error: err.message });
    }
}

