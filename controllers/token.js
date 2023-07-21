const jwt = require('jsonwebtoken');

const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ 
            message: 'Refresh token is required',
            success: false 
        });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userId) => {
        if (err) {
            return res.status(403).json({ 
                message: 'Invalid refresh token',
                success: false 
            });
        }

        const accessToken = jwt.sign({ 
            id: userId,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });

        return res.status(200).json({ 
            accessToken : accessToken,
            success: true,
        });
    });
};

module.exports = refreshAccessToken;