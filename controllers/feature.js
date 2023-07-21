const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: 'posts',
            populate : {
                path : 'comments'
            }
        });

        if (!user) {
            return res.status(401).json({
                message : 'User not found',
                success : false,
            });
        }

        res.status(200).json({
            data : user,
            success : false,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const likePost = async (req, res) => {
    try {
        const liked = await Post.updateOne(
            { _id : req.params.id },
            { $push : 
                { 
                    likes : req.user.id 
                }
            });
        
        if (!liked) {
            return res.status(401).json({
                message : 'Unable to like post',
                success : false,
            });
        }

        res.status(200).json({
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

const unlikePost = async (req, res) => {
    try {
        const unliked = await Post.updateOne(
            { _id : req.params.id },
            { $pull : 
                { 
                    likes : req.user.id 
                }
            });
        
        if (!unliked) {
            return res.status(401).json({
                message : 'Unable to unlike post',
                success : false,
            });
        }

        res.status(200).json({
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

const commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(401).json({
                message : 'Post not found',
                success : false,
            });
        }

        const comment = new Comment({
            postId : post._id,
            comment : req.body.comment,
            userId : req.user.id
        });

        await comment.save();

        res.status(201).json({
            success : true
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

const followUser = async (req, res) => {
    try {
        const followed = await User.updateOne(
            { _id : req.user.id },
            { $push : 
                { 
                    following : req.params.id 
                }
            });

        const followerAdded = await User.updateOne(
            { _id : req.params.id},
            { $push :
                {
                    followers : req.user.id
                }
            });
        
        if (!followed || !followerAdded) {
            return res.status(401).json({
                message : 'Unable to follow user',
                success : false,
            });
        }

        res.status(200).json({
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

const unfollowUser = async (req, res) => {
    try {
        const unfollowed = await User.updateOne(
            { _id : req.user.id },
            { $pull : 
                { 
                    following : req.params.id 
                }
            });

        // Refactor this redundant 'await' on a non-promise.sonarlint(javascript:S4123)
        const followerRemoved = await User.updateOne(
            { _id : req.params.id },
            { $pull :
                {
                    followers : req.user.id
                }
            });
        
        if (!unfollowed || !followerRemoved) {
            return res.status(401).json({
                message : 'Unable to follow user',
                success : false,
            });
        }

        res.status(200).json({
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

module.exports = {
    getProfileById,
    likePost,
    unlikePost,
    commentPost,
    followUser,
    unfollowUser
};