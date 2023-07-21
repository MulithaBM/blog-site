const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {
    generateAccessToken,
    generateRefreshToken
} = require('../helpers/tokenManager');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
  
        if (!name || !email || !password) {
            return res.status(400).json({
            message: 'missing required fields',
            success: false,
            });
        }
  
        let user = await User.findOne({ email });
  
        if (user) {
            return res.status(409).json({
                message: 'user already exists',
                success: false,
            });
        }
  
        user = new User({
            name,
            email,
            password,
        });
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    
        await user.save();
    
        return res.status(201).json({
            success: true,
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'invalid credentials',
                success: false 
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'invalid credentials',
                success: false 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ 
                message: 'invalid credentials',
                success: false 
            });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.status(200).json({
            accessToken : accessToken,
            refreshToken : refreshToken,
            success: true
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'posts',
            populate : {
                path : 'comments'
            }
        });

        res.status(200).json({
            data : user,
            success: true
        });

    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success: false
        });
    }
};

module.exports = {
    signUp,
    signIn,
    getUser
};