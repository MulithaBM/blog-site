const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    try {
        return jwt.sign({ id : id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIRATION_TIME });
    }
    catch (error) {
        throw error;
    }
};

const generateRefreshToken = (id) => {
    try {
        return jwt.sign({ id : id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn : process.env.REFRESH_TOKEN_EXPIRATION_TIME });
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};