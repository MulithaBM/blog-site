const router = require('express').Router();

const refreshAccessToken = require('../controllers/token');
const auth = require('../middlewares/verifyAuth');

router.post('/token/refresh', auth, refreshAccessToken);

module.exports = router;