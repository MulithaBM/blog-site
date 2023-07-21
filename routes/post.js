const router = require('express').Router();

const {
    postById,
    getAllPosts,
    getPostById,
    getFollowersPosts,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/post');

const auth = require('../middlewares/verifyAuth');

router.get('/posts', getAllPosts);
router.get('/post/:id', postById, getPostById);
router.get('/posts/followers', auth, getFollowersPosts);

router.post('/post', auth, createPost);
router.put('/post/:id', auth, postById, updatePost);
router.delete('/post/:id', auth, postById, deletePost);

module.exports = router;