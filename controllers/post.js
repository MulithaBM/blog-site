const Post = require('../models/post');
const User = require('../models/user');

const postById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
                success: false,
            });
        }

        req.post = post;

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('comments').populate('posted_by');

        return res.status(200).json({
            data : posts,
            success : true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments').populate('posted_by');

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
                success: false,
            });
        }

        return res.status(200).json({
            data : post,
            success : true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const getFollowersPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const posts = await Post.find({ userId: user.following }).populate('comments').populate('posted_by');

        return res.status(200).json({
            data : posts,
            success : true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            userId : req.user.id,
            title : req.body.title,
            description : req.body.description,
            post_image: req.body.image_url,
        });

        newPost.save();

        return res.status(201).json({
            data : newPost,
            success : true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = req.post;
        
        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'You are not authorized to update this post',
                success: false,
            });
        }

        post.title = req.body.title;
        post.description = req.body.description;
        post.post_image = req.body.image_url;

        await post.save();

        return res.status(201).json({
            data : post,
            success : true,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = req.post;

        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'You are not authorized to delete this post',
                success: false,
            });
        }
        
        await post.deleteOne();

        return res.status(200).json({
            data : post,
            success : true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = {
    postById,
    getAllPosts,
    getPostById,
    getFollowersPosts,
    createPost,
    updatePost,
    deletePost,
};