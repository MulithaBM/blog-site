const router = require('express').Router();
const rateLimitter = require('../helpers/rateLimiter');

const { 
    signUp, 
    signIn, 
    getUser 
} = require('../controllers/user');

const auth = require('../middlewares/verifyAuth');

router.post('/signup', signUp);
router.post('/signin', rateLimitter(1, 60), signIn);

router.get('/user', auth, getUser);

module.exports = router;