const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message : "missing token, access denied",
            success : false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message : "invalid token, access denied",
            success : false
        });
    }
}

module.exports = auth;