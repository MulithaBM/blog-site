const router = require('express').Router();

const {
    getProfileById,
    likePost,
    unlikePost,
    commentPost,
    followUser,
    unfollowUser
} = require('../controllers/feature');

const auth = require('../middlewares/verifyAuth');

router.get('/profile/:id', getProfileById);

router.get('/like/:id', auth, likePost);
router.get('/unlike/:id', auth, unlikePost);

router.get('/follow/:id', auth, followUser);
router.get('/unfollow/:id', auth, unfollowUser);

router.post('/post/comment/:id', auth, commentPost);

module.exports = router;