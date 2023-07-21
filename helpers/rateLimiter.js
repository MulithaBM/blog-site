const rateLimit = require('express-rate-limit');

const rateLimiter = (minutes, rate) => {
    return rateLimit({
        windowMs: minutes * 60 * 1000,
        max: rate,
        message: 'Too many requests from this IP, please try again later.'
    });
};

module.exports = rateLimiter;